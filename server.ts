import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { HOME_CHEFS } from './src/data/chefs.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize GoogleGenAI client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// REST API Endpoints
app.get('/api/chefs', (_req, res) => {
  res.json({ chefs: HOME_CHEFS });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message, userProfile, history = [] } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Prepare chef summary for context
    const chefCatalogSummary = HOME_CHEFS.map(c => ({
      id: c.id,
      name: c.name,
      specialty: c.specialty,
      chefName: c.chefName,
      tags: c.tags,
      dietaryCategory: c.dietaryCategory,
      avgMacros: `${c.avgMacros.protein}g protein, ${c.avgMacros.carbs}g carbs, ${c.avgMacros.fat}g fat, ${c.avgMacros.calories} kcal`,
      pricePerMeal: `$${c.pricePerMeal}`,
      signatureDish: c.dishes.find(d => d.isSignature)?.name || c.dishes[0]?.name,
    }));

    const systemInstruction = `You are NutriGuide AI, the expert clinical nutritionist and culinary matchmaker for NutriHome.
You help health-conscious users, athletes, busy professionals, and families find the ideal home-cooked food maker tailored to their age, fitness level, dietary restrictions, and body goals.

AVAILABLE HOME CHEFS ON NUTRIHOME:
${JSON.stringify(chefCatalogSummary, null, 2)}

YOUR RULES:
1. Carefully analyze the user's input (age, weight/fitness level, goals like muscle gain, weight loss, keto, hypertension, diabetes care, comfort food, etc.).
2. Recommend the best matching home chef from the catalog above. You may also mention a second choice if relevant (e.g. for different days).
3. Explain WHY this chef's meals and macro composition (protein, carbs, fat, calories, cooking style) directly satisfy their physiological goals.
4. Keep the tone warm, empowering, encouraging, and nutritional science-informed (around 3-5 sentences).
5. Highlight the exact chef id in your response using a special marker so our UI can embed a direct action card: [CHEF_MATCH:chef_id] (e.g. [CHEF_MATCH:fitbites] or [CHEF_MATCH:green-glow] or [CHEF_MATCH:aunty-comfort] or [CHEF_MATCH:ketocraft] or [CHEF_MATCH:ayurvedic-nani] or [CHEF_MATCH:plant-fuel]).
6. Provide an actionable daily nutrition tip for their fitness journey (e.g., hydration, meal timing, protein pacing).`;

    if (ai) {
      try {
        // Build conversation contents
        const conversationContents: any[] = [];
        
        // Add past history if provided (limit to recent 6 turns)
        const recentHistory = Array.isArray(history) ? history.slice(-6) : [];
        for (const turn of recentHistory) {
          if (turn.sender === 'user') {
            conversationContents.push({ role: 'user', parts: [{ text: turn.text }] });
          } else if (turn.sender === 'ai') {
            conversationContents.push({ role: 'model', parts: [{ text: turn.text }] });
          }
        }

        // Add user profile context if available
        let promptText = message;
        if (userProfile && (userProfile.age || userProfile.goal || userProfile.diet)) {
          promptText = `[User Profile Context: Age: ${userProfile.age || 'Not specified'}, Goal: ${userProfile.goal || 'General Health'}, Diet: ${userProfile.diet || 'Any'}, Activity: ${userProfile.activity || 'Moderate'}]\n\nUser Question: ${message}`;
        }

        conversationContents.push({ role: 'user', parts: [{ text: promptText }] });

        // Timeout promise after 6000ms
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('AI response timed out')), 6000)
        );

        const responsePromise = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: conversationContents,
          config: {
            systemInstruction,
          },
        });

        const response = await Promise.race([responsePromise, timeoutPromise]);

        const responseText = response.text || "I've matched you with our top home chef tailored to your goals!";
        
        // Extract matched chef id if present
        const matchRegex = /\[CHEF_MATCH:([a-zA-Z0-9_-]+)\]/;
        const match = responseText.match(matchRegex);
        const matchedChefId = match ? match[1] : null;
        const cleanText = responseText.replace(matchRegex, '').trim();

        return res.json({
          reply: cleanText,
          matchedChefId: matchedChefId,
        });
      } catch (geminiErr) {
        console.warn('Gemini generateContent timed out or errored, using smart clinical nutritionist matcher:', geminiErr);
        // Fall through to smart clinical matcher below
      }
    }

    // Smart clinical nutritionist & chef matcher
    const lower = message.toLowerCase();
    let matchedChef = HOME_CHEFS[0]; // default FitBites
    let explanation = "";
    let tip = "";

    if (lower.includes('keto') || lower.includes('low carb') || lower.includes('sugar free') || lower.includes('fat burn')) {
      matchedChef = HOME_CHEFS.find(c => c.id === 'ketocraft') || HOME_CHEFS[3];
      explanation = "Based on your low-carb and metabolic ketosis target, KetoCraft Kitchen delivers meals with under 7g net carbs, healthy grass-fed fats, and sustained cellular energy.";
      tip = "Maintain steady electrolyte levels (sodium and magnesium) to avoid the keto transition dip.";
    } else if (lower.includes('salad') || lower.includes('detox') || lower.includes('lose weight') || lower.includes('weight loss') || lower.includes('calorie deficit') || lower.includes('gut')) {
      matchedChef = HOME_CHEFS.find(c => c.id === 'green-glow') || HOME_CHEFS[1];
      explanation = "For gentle calorie deficit, gut microflora balance, and anti-bloating, Green Glow Bowls offers fiber-rich sprouted greens and live probiotic dressings under 350 kcal.";
      tip = "Drinking 500ml of room-temperature water 20 minutes before meals aids natural satiety.";
    } else if (lower.includes('ayurvedic') || lower.includes('blood pressure') || lower.includes('hypertension') || lower.includes('senior') || lower.includes('elderly') || lower.includes('low sodium') || lower.includes('joint')) {
      matchedChef = HOME_CHEFS.find(c => c.id === 'ayurvedic-nani') || HOME_CHEFS[4];
      explanation = "For balanced circulation and easy digestive transit, Chef Meera's Ayurvedic Table uses anti-inflammatory turmeric, bottle gourd, and low-sodium Himalayan spices.";
      tip = "Slow-simmered warm vegetables promote gentle enzymatic breakdown without gastrointestinal distress.";
    } else if (lower.includes('vegan') || lower.includes('plant') || lower.includes('dairy free')) {
      matchedChef = HOME_CHEFS.find(c => c.id === 'plant-fuel') || HOME_CHEFS[5];
      explanation = "The Plant Fuel Co. proves 100% plant-based food can supply 36g+ clean protein per serving using organic tempeh, lentils, and edamame without artificial powders.";
      tip = "Combining legumes with sprouted grains ensures a complete amino acid profile for muscle synthesis.";
    } else if (lower.includes('thali') || lower.includes('comfort') || lower.includes('traditional') || lower.includes('roti') || lower.includes('dal') || lower.includes('home style') || lower.includes('homestyle')) {
      matchedChef = HOME_CHEFS.find(c => c.id === 'aunty-comfort') || HOME_CHEFS[2];
      explanation = "For comforting, wholesome energy and authentic taste, Aunty's Comfort Kitchen serves fresh whole-wheat rotis, stone-ground dal tadka, and seasonal home-style subzis.";
      tip = "Complex carbohydrates from whole-wheat phulkas provide sustained glucose release through the afternoon.";
    } else {
      matchedChef = HOME_CHEFS[0];
      explanation = "For building athletic tone, sustaining lean muscle, and clean daily fuel, FitBites by Anjali offers weighed high-protein chicken breast and quinoa power bowls.";
      tip = "Aim for 25-40g of protein within 90 minutes post-training to accelerate myofibrillar repair.";
    }

    return res.json({
      reply: `Hello! ${explanation} Their meals average ${matchedChef.avgMacros.protein}g protein and ${matchedChef.avgMacros.calories} calories, making them an ideal partner for your health journey. Pro-tip: ${tip}`,
      matchedChefId: matchedChef.id,
    });
  } catch (err: any) {
    console.error('Gemini API Error:', err);
    // Graceful error fallback
    return res.status(200).json({
      reply: "I analyzed your dietary goals! Based on popular health metrics, FitBites by Anjali and Green Glow Bowls provide excellent macro balance. Check out their menus to get started right away!",
      matchedChefId: 'fitbites'
    });
  }
});

// Vite middleware in dev or static serve in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`NutriHome Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
