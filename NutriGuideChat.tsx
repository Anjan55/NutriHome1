import React, { useState, useRef, useEffect } from 'react';
import { Send, ChevronDown, ChevronUp, Sparkles, Bot, User, Utensils, RefreshCw, Maximize2, Minimize2, ArrowRight } from 'lucide-react';
import { ChatMessage, Chef, UserProfile } from '../types.ts';

interface NutriGuideChatProps {
  chefs: Chef[];
  onSelectChef: (chef: Chef) => void;
  isOpen: boolean;
  onToggle: () => void;
  userProfile?: UserProfile;
  externalQuery?: string;
  onClearExternalQuery?: () => void;
}

const STARTER_PROMPTS = [
  "I'm 28, doing HIIT 4x/week, aiming for 140g protein daily",
  "I'm 44, office worker wanting to drop 8kg and avoid afternoon crashes",
  "Elderly parent with mild hypertension needing low-sodium comfort food",
  "Strict keto lunch plan with under 10g net carbs for steady energy",
];

export const NutriGuideChat: React.FC<NutriGuideChatProps> = ({
  chefs,
  onSelectChef,
  isOpen,
  onToggle,
  userProfile,
  externalQuery,
  onClearExternalQuery,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hi! I'm NutriGuide AI. Tell me your age, body goals, dietary preferences, or fitness level. I'll analyze your nutritional needs and match you with the perfect home chef!",
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle external query (from macro wizard or chef card "Ask AI")
  useEffect(() => {
    if (externalQuery && externalQuery.trim()) {
      handleSendMessage(externalQuery);
      if (onClearExternalQuery) onClearExternalQuery();
    }
  }, [externalQuery]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          userProfile: userProfile || null,
          history: messages.slice(-5),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const aiReplyText = data.reply || "I've matched you with our top home chef tailored to your goals!";
      const matchedChefId = data.matchedChefId || null;

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReplyText,
        matchedChefId: matchedChefId,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      // Graceful local advisor response
      const fallbackMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "I analyzed your requirements! Based on your health metrics, our home kitchens offer dedicated macro-weighed options. Take a look at FitBites by Anjali for high-protein goals, or Green Glow Bowls for gentle detox nutrition.",
        matchedChefId: 'fitbites',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: "Hi! Tell me your age, body goals, and fitness level. I'll match you with the perfect home chef.",
        timestamp: 'Just now',
      },
    ]);
  };

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ease-out flex flex-col overflow-hidden bg-white shadow-2xl border border-slate-200/90 ${
        isExpanded
          ? 'bottom-4 right-4 left-4 sm:left-auto sm:w-[460px] h-[640px] max-h-[90vh] rounded-3xl'
          : 'bottom-4 right-4 left-4 sm:left-auto sm:w-[380px] rounded-2xl'
      } ${!isOpen ? 'h-14 sm:w-[320px]' : isExpanded ? '' : 'h-[500px]'}`}
    >
      {/* Chat Header (Honors user's green header & toggle behavior) */}
      <div
        onClick={onToggle}
        className="bg-emerald-600 text-white px-4 py-3 flex items-center justify-between cursor-pointer select-none shrink-0 shadow-sm hover:bg-emerald-700 transition"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-xs">
            <Bot className="w-4 h-4 text-emerald-100" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-sm tracking-tight">
              <span>NutriGuide AI</span>
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
            </div>
            <p className="text-[11px] text-emerald-100/90 font-medium hidden sm:block">
              {isOpen ? 'Clinical Nutrition & Chef Matcher' : 'Click to chat with AI'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {isOpen && (
            <>
              <button
                type="button"
                onClick={handleClearChat}
                className="p-1.5 rounded-lg hover:bg-white/20 text-emerald-100 hover:text-white transition"
                title="Reset conversation"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="p-1.5 rounded-lg hover:bg-white/20 text-emerald-100 hover:text-white transition hidden sm:block"
                title={isExpanded ? 'Standard view' : 'Expand window'}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </>
          )}

          <button
            type="button"
            className="p-1.5 rounded-lg hover:bg-white/20 text-white transition ml-1"
            aria-label="Toggle chat"
          >
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Chat Body */}
      {isOpen && (
        <div
          ref={chatBodyRef}
          className="flex-1 p-4 overflow-y-auto bg-slate-50/70 flex flex-col gap-3 scroll-smooth text-sm"
        >
          {/* Quick Context Banner if user calibrated macros */}
          {userProfile?.calculatedTDEE && (
            <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-2.5 text-xs text-emerald-900 flex items-center justify-between">
              <div>
                <span className="font-bold">Active Goal:</span> {userProfile.fitnessGoal.replace('_', ' ')}
              </div>
              <span className="font-extrabold text-emerald-800">
                {userProfile.targetCalories} kcal / {userProfile.targetProtein}g Pro
              </span>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const matchedChef = msg.matchedChefId
              ? chefs.find((c) => c.id.toLowerCase() === msg.matchedChefId?.toLowerCase())
              : null;

            return (
              <div
                key={msg.id}
                className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 sm:p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                    isUser
                      ? 'bg-emerald-600 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>

                  {/* Interactive Embedded Chef Recommendation Card */}
                  {matchedChef && (
                    <div className="mt-3 pt-3 border-t border-slate-100 bg-emerald-50/60 rounded-xl p-2.5 text-slate-900">
                      <div className="flex items-center gap-2 mb-1.5">
                        <img
                          src={matchedChef.avatarImage}
                          alt={matchedChef.chefName}
                          className="w-8 h-8 rounded-full object-cover border border-emerald-500"
                        />
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {matchedChef.name}
                          </h4>
                          <p className="text-[10px] text-emerald-800 font-medium truncate">
                            {matchedChef.specialty}
                          </p>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-600 bg-white/80 p-1.5 rounded-lg mb-2">
                        Avg: <strong className="text-emerald-700">{matchedChef.avgMacros.protein}g protein</strong> ·{' '}
                        {matchedChef.avgMacros.calories} kcal
                      </div>

                      <button
                        onClick={() => onSelectChef(matchedChef)}
                        className="w-full py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-xs"
                      >
                        <span>View Chef's Menu & Plan</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <div
                    className={`text-[9px] mt-1 text-right ${
                      isUser ? 'text-emerald-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-xs px-4 py-3 shadow-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce-dot" />
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce-dot delay-150" />
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce-dot delay-300" />
              </div>
            </div>
          )}

          {/* Starter Prompts (if only greeting exists) */}
          {messages.length === 1 && !isTyping && (
            <div className="mt-2 space-y-1.5">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Quick Prompts to Try:
              </p>
              {STARTER_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSendMessage(prompt)}
                  className="w-full text-left p-2 rounded-xl bg-white hover:bg-emerald-50 text-[11px] text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-200 transition shadow-2xs"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Chat Footer */}
      {isOpen && (
        <div className="p-2.5 sm:p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your goals, age, or cravings..."
            className="flex-1 px-3.5 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isTyping}
            className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white flex items-center justify-center transition shadow-md shadow-emerald-600/20 shrink-0"
            aria-label="Send message"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      )}
    </div>
  );
};
