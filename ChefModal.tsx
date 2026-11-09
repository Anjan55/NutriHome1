import React, { useState } from 'react';
import { X, Star, ShieldCheck, Clock, MapPin, Check, Plus, ShoppingBag, Sparkles, Award } from 'lucide-react';
import { Chef, Dish, CartItem } from '../types.ts';

interface ChefModalProps {
  chef: Chef | null;
  onClose: () => void;
  onAddToCart: (dish: Dish, chef: Chef, planType: 'single' | 'weekly') => void;
  onAskAIAboutChef: (chef: Chef) => void;
}

export const ChefModal: React.FC<ChefModalProps> = ({
  chef,
  onClose,
  onAddToCart,
  onAskAIAboutChef,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'single' | 'weekly'>('single');
  const [addedDishId, setAddedDishId] = useState<string | null>(null);

  if (!chef) return null;

  const handleAdd = (dish: Dish) => {
    onAddToCart(dish, chef, selectedPlan);
    setAddedDishId(dish.id);
    setTimeout(() => {
      setAddedDishId(null);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative bg-white rounded-3xl w-full max-w-3xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition shadow-md"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Banner */}
        <div className="relative h-48 sm:h-56 shrink-0 bg-slate-800">
          <img
            src={chef.coverImage}
            alt={chef.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

          {/* Badges on Top */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-md">
              <ShieldCheck className="w-3.5 h-3.5" />
              {chef.hygieneScore}/100 Kitchen Certified
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-amber-300 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-300" />
              {chef.rating.toFixed(1)} ({chef.reviewsCount} reviews)
            </span>
          </div>

          {/* Chef Profile Overlap */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div className="flex items-center gap-3">
              <img
                src={chef.avatarImage}
                alt={chef.chefName}
                className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover border-2 border-white shadow-lg"
              />
              <div className="text-white">
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight drop-shadow-md">
                  {chef.name}
                </h2>
                <p className="text-xs sm:text-sm text-emerald-300 font-semibold drop-shadow-sm">
                  {chef.chefName} · {chef.experience}
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-300 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {chef.distance}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" /> {chef.deliveryTime}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onAskAIAboutChef(chef)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold border border-white/30 transition shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Ask AI Match
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Kitchen Bio & Philosophy */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
            <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              About This Home Kitchen
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{chef.bio}</p>
            <div className="mt-3 pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
              <span>Verified Food Safety Lic: <strong className="text-slate-700">{chef.fssaiNumber}</strong></span>
              <div className="flex gap-1.5">
                {chef.tags.map(t => (
                  <span key={t} className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Order Plan Selector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Select Your Meal Option
              </h3>
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Weekly Tiffin saves ~15%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedPlan('single')}
                className={`p-3 rounded-2xl border text-left transition ${
                  selectedPlan === 'single'
                    ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/30'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900">Single Fresh Box</span>
                  <span className="text-xs font-bold text-emerald-700">${chef.pricePerMeal.toFixed(2)}</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Try once. Cooked fresh today in individual portion.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPlan('weekly')}
                className={`p-3 rounded-2xl border text-left transition ${
                  selectedPlan === 'weekly'
                    ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/30'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900">5-Day Weekly Tiffin Plan</span>
                  <span className="text-xs font-bold text-emerald-700">${chef.weeklyPlanPrice.toFixed(2)}/wk</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Lunch or Dinner delivered Mon-Fri with rotating daily specials.
                </p>
              </button>
            </div>
          </div>

          {/* Rotating Daily Dishes */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between">
              <span>Chef's Signature Dishes & Macros ({chef.dishes.length})</span>
              <span className="text-xs font-normal text-slate-500">Weighed to the gram</span>
            </h3>

            <div className="space-y-3">
              {chef.dishes.map((dish) => {
                const isJustAdded = addedDishId === dish.id;
                const effectivePrice = selectedPlan === 'weekly' ? chef.weeklyPlanPrice : dish.price;

                return (
                  <div
                    key={dish.id}
                    className="p-3 sm:p-4 rounded-2xl border border-slate-200/90 bg-white hover:border-emerald-200 transition flex flex-col sm:flex-row gap-4 items-center shadow-2xs"
                  >
                    {/* Dish Image */}
                    <div className="w-full sm:w-28 h-28 shrink-0 rounded-xl overflow-hidden relative bg-slate-100">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span
                        className={`absolute top-2 left-2 text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                          dish.diet === 'veg'
                            ? 'bg-emerald-600 text-white'
                            : dish.diet === 'vegan'
                            ? 'bg-green-700 text-white'
                            : 'bg-rose-600 text-white'
                        }`}
                      >
                        {dish.diet}
                      </span>
                    </div>

                    {/* Dish Info */}
                    <div className="flex-1 w-full">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900">
                            {dish.name}
                          </h4>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                            {dish.description}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-sm sm:text-base font-extrabold text-slate-900">
                            ${effectivePrice.toFixed(2)}
                          </span>
                          {selectedPlan === 'weekly' && (
                            <span className="block text-[10px] text-emerald-600 font-bold">
                              5-Day Plan
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Macro Grid */}
                      <div className="mt-3 grid grid-cols-4 gap-1.5 text-center bg-slate-50 p-2 rounded-xl text-xs border border-slate-100">
                        <div>
                          <span className="block text-[10px] text-slate-400 font-semibold">Calories</span>
                          <span className="font-bold text-slate-800">{dish.calories} kcal</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-slate-400 font-semibold">Protein</span>
                          <span className="font-bold text-emerald-700">{dish.protein}g</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-slate-400 font-semibold">Carbs</span>
                          <span className="font-bold text-amber-700">{dish.carbs}g</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-slate-400 font-semibold">Fats</span>
                          <span className="font-bold text-blue-700">{dish.fat}g</span>
                        </div>
                      </div>

                      {/* Add Button */}
                      <div className="mt-3 flex justify-end">
                        <button
                          onClick={() => handleAdd(dish)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs ${
                            isJustAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-900 hover:bg-slate-800 text-white'
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              Added to Meal Box
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              Add {selectedPlan === 'weekly' ? 'Weekly Subscription' : 'Single Meal'}
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
