import React, { useState } from 'react';
import { X, Calculator, Sparkles, Dumbbell, Flame, HeartPulse, Check, ArrowRight } from 'lucide-react';
import { UserProfile } from '../types.ts';

interface MacroWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyProfile: (profile: UserProfile, triggerAIConsult: boolean) => void;
  initialProfile?: UserProfile;
}

export const MacroWizardModal: React.FC<MacroWizardModalProps> = ({
  isOpen,
  onClose,
  onApplyProfile,
  initialProfile,
}) => {
  const [age, setAge] = useState<number>(initialProfile?.age || 28);
  const [gender, setGender] = useState<'male' | 'female' | 'other'>(initialProfile?.gender || 'male');
  const [weightKg, setWeightKg] = useState<number>(initialProfile?.weightKg || 70);
  const [heightCm, setHeightCm] = useState<number>(initialProfile?.heightCm || 172);
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'light' | 'moderate' | 'very_active'>(
    initialProfile?.activityLevel || 'moderate'
  );
  const [fitnessGoal, setFitnessGoal] = useState<'weight_loss' | 'muscle_gain' | 'maintenance' | 'keto' | 'senior_health'>(
    initialProfile?.fitnessGoal || 'muscle_gain'
  );
  const [dietaryPreference, setDietaryPreference] = useState<'all' | 'veg' | 'non-veg' | 'vegan' | 'keto'>(
    initialProfile?.dietaryPreference || 'all'
  );

  if (!isOpen) return null;

  // Mifflin-St Jeor BMR calculation
  let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
  if (gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very_active: 1.75,
  };

  const tdee = Math.round(bmr * activityMultipliers[activityLevel]);

  let targetCalories = tdee;
  let proteinRatio = 0.3;
  let carbRatio = 0.45;
  let fatRatio = 0.25;

  if (fitnessGoal === 'weight_loss') {
    targetCalories = Math.max(1200, Math.round(tdee - 450));
    proteinRatio = 0.35;
    carbRatio = 0.35;
    fatRatio = 0.3;
  } else if (fitnessGoal === 'muscle_gain') {
    targetCalories = Math.round(tdee + 300);
    proteinRatio = 0.3;
    carbRatio = 0.45;
    fatRatio = 0.25;
  } else if (fitnessGoal === 'keto') {
    targetCalories = Math.round(tdee - 200);
    proteinRatio = 0.25;
    carbRatio = 0.05; // 5% carbs
    fatRatio = 0.7; // 70% fats
  } else if (fitnessGoal === 'senior_health') {
    targetCalories = Math.round(tdee - 100);
    proteinRatio = 0.25;
    carbRatio = 0.5;
    fatRatio = 0.25;
  }

  // Grams: 1g protein = 4 kcal, 1g carb = 4 kcal, 1g fat = 9 kcal
  const targetProtein = Math.round((targetCalories * proteinRatio) / 4);
  const targetCarbs = Math.round((targetCalories * carbRatio) / 4);
  const targetFat = Math.round((targetCalories * fatRatio) / 9);

  const handleApply = (triggerAIConsult: boolean) => {
    const profile: UserProfile = {
      age,
      gender,
      weightKg,
      heightCm,
      activityLevel,
      fitnessGoal,
      dietaryPreference,
      calculatedTDEE: tdee,
      targetCalories,
      targetProtein,
      targetCarbs,
      targetFat,
    };
    onApplyProfile(profile, triggerAIConsult);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                NutriHome Macro & Goal Wizard
              </h2>
              <p className="text-xs text-slate-500">
                Scientifically calibrate your daily calories and match ideal home kitchens
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Wizard Form & Interactive Results */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Inputs Row 1: Age, Gender, Weight, Height */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Age (Years)</label>
              <input
                type="number"
                min={14}
                max={99}
                value={age}
                onChange={(e) => setAge(Number(e.target.value) || 20)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Weight (kg)</label>
              <input
                type="number"
                min={30}
                max={200}
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value) || 60)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Height (cm)</label>
              <input
                type="number"
                min={100}
                max={230}
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value) || 170)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Activity Level Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">
              Weekly Activity Level
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'sedentary', label: 'Sedentary', desc: 'Desk job, little exercise' },
                { id: 'light', label: 'Light', desc: '1-2 workouts / week' },
                { id: 'moderate', label: 'Moderate', desc: '3-4 workouts / week' },
                { id: 'very_active', label: 'Very Active', desc: '5+ intense sessions' },
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setActivityLevel(lvl.id as any)}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    activityLevel === lvl.id
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold">{lvl.label}</div>
                  <div className="text-[10px] text-slate-500">{lvl.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Primary Fitness & Health Goal */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">
              Primary Goal
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'muscle_gain', label: 'Muscle Gain & Strength', icon: Dumbbell },
                { id: 'weight_loss', label: 'Fat Loss & Detox', icon: Flame },
                { id: 'maintenance', label: 'Clean Home Maintenance', icon: Check },
                { id: 'keto', label: 'Keto & Low Carb', icon: HeartPulse },
                { id: 'senior_health', label: 'Gentle / Senior / Low-Na', icon: HeartPulse },
              ].map((g) => {
                const Icon = g.icon;
                const isSelected = fitnessGoal === g.id;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setFitnessGoal(g.id as any)}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span className="text-xs">{g.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dietary Preference */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">
              Dietary Preference
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'Any / Flexible' },
                { id: 'veg', label: 'Pure Vegetarian' },
                { id: 'non-veg', label: 'Non-Vegetarian (Lean Meats)' },
                { id: 'vegan', label: '100% Plant-Based / Vegan' },
                { id: 'keto', label: 'Keto Friendly' },
              ].map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDietaryPreference(d.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                    dietaryPreference === d.id
                      ? 'border-emerald-600 bg-emerald-600 text-white'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Instant Calculation Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4 sm:p-5 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-3 border-b border-slate-700 pb-2">
              <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400">
                Your Biological Daily Target
              </span>
              <span className="text-xs text-slate-400">
                Maintenance: {tdee} kcal
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-xs">
                <span className="block text-[10px] text-slate-300 font-medium">Daily Calories</span>
                <span className="text-lg sm:text-xl font-extrabold text-amber-300">{targetCalories}</span>
                <span className="block text-[9px] text-slate-400">kcal/day</span>
              </div>
              <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-xs">
                <span className="block text-[10px] text-slate-300 font-medium">Protein</span>
                <span className="text-lg sm:text-xl font-extrabold text-emerald-300">{targetProtein}g</span>
                <span className="block text-[9px] text-slate-400">build & recover</span>
              </div>
              <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-xs">
                <span className="block text-[10px] text-slate-300 font-medium">Carbohydrates</span>
                <span className="text-lg sm:text-xl font-extrabold text-sky-300">{targetCarbs}g</span>
                <span className="block text-[9px] text-slate-400">daily energy</span>
              </div>
              <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-xs">
                <span className="block text-[10px] text-slate-300 font-medium">Healthy Fats</span>
                <span className="text-lg sm:text-xl font-extrabold text-purple-300">{targetFat}g</span>
                <span className="block text-[9px] text-slate-400">hormonal balance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => handleApply(false)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition"
          >
            Save Target to Dashboard
          </button>
          <button
            onClick={() => handleApply(true)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Find My Matching Home Chefs with AI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
