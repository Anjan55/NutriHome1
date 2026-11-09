import React from 'react';
import { Star, ShieldCheck, Clock, MapPin, Sparkles, ArrowRight, Utensils, Heart } from 'lucide-react';
import { Chef } from '../types.ts';

interface ChefCardProps {
  chef: Chef;
  onSelectChef: (chef: Chef) => void;
  onAskAIAboutChef: (chef: Chef) => void;
  isAiMatched?: boolean;
}

export const ChefCard: React.FC<ChefCardProps> = ({
  chef,
  onSelectChef,
  onAskAIAboutChef,
  isAiMatched,
}) => {
  const signatureDish = chef.dishes.find((d) => d.isSignature) || chef.dishes[0];

  return (
    <div
      className={`group bg-white rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col hover:shadow-xl hover:-translate-y-1 ${
        isAiMatched
          ? 'ring-2 ring-emerald-500 border-emerald-400 shadow-lg shadow-emerald-500/10'
          : 'border-slate-200/90 shadow-xs'
      }`}
    >
      {/* AI Matched Ribbon */}
      {isAiMatched && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-3.5 py-1 text-xs font-bold flex items-center justify-between tracking-wide">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Top AI Match for Your Goals
          </span>
          <span className="text-[10px] uppercase font-extrabold bg-white/20 px-2 py-0.5 rounded-full">
            Recommended
          </span>
        </div>
      )}

      {/* Image & Badges Container */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={chef.coverImage}
          alt={chef.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          {/* Hygiene Score */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-slate-800 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            {chef.hygieneScore}/100 Hygiene
          </span>

          {/* Rating */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-[11px] font-bold text-amber-400 shadow-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{chef.rating.toFixed(1)}</span>
            <span className="text-slate-300 font-normal">({chef.reviewsCount})</span>
          </span>
        </div>

        {/* Bottom Distance & Delivery Meta */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
          <span className="inline-flex items-center gap-1 drop-shadow-md">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            {chef.distance}
          </span>
          <span className="inline-flex items-center gap-1 drop-shadow-md">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            {chef.deliveryTime}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Chef Profile Header */}
          <div className="flex items-start gap-3 mb-2.5">
            <img
              src={chef.avatarImage}
              alt={chef.chefName}
              className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500 shadow-xs shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
                {chef.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium truncate">
                {chef.chefName} · {chef.experience}
              </p>
            </div>
          </div>

          {/* Specialty */}
          <div className="mb-3">
            <p className="text-sm font-semibold text-emerald-700 bg-emerald-50/80 px-2.5 py-1 rounded-lg inline-block">
              {chef.specialty}
            </p>
            <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {chef.bio}
            </p>
          </div>

          {/* Average Macro Breakdown Bar */}
          <div className="bg-slate-50 rounded-xl p-2.5 mb-3.5 border border-slate-100">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex justify-between">
              <span>Avg Per Meal Macros</span>
              <span className="text-slate-700 font-extrabold">{chef.avgMacros.calories} kcal</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-center">
              <div className="bg-white py-1 px-1.5 rounded-lg border border-slate-200/60 shadow-2xs">
                <span className="block text-[10px] text-slate-400 font-semibold">Protein</span>
                <span className="text-xs font-extrabold text-emerald-700">{chef.avgMacros.protein}g</span>
              </div>
              <div className="bg-white py-1 px-1.5 rounded-lg border border-slate-200/60 shadow-2xs">
                <span className="block text-[10px] text-slate-400 font-semibold">Carbs</span>
                <span className="text-xs font-extrabold text-amber-700">{chef.avgMacros.carbs}g</span>
              </div>
              <div className="bg-white py-1 px-1.5 rounded-lg border border-slate-200/60 shadow-2xs">
                <span className="block text-[10px] text-slate-400 font-semibold">Fats</span>
                <span className="text-xs font-extrabold text-blue-700">{chef.avgMacros.fat}g</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {chef.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md border border-slate-200/50"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Signature Dish Sneak Peek */}
          {signatureDish && (
            <div className="text-xs text-slate-600 bg-emerald-50/40 p-2 rounded-lg border border-emerald-100/60 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5 truncate mr-2">
                <Utensils className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate font-medium">Must-try: {signatureDish.name}</span>
              </div>
              <span className="font-bold text-slate-900 shrink-0">${signatureDish.price.toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
          <button
            onClick={() => onSelectChef(chef)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 group-hover:bg-emerald-600"
          >
            <span>View Menu ({chef.dishes.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onAskAIAboutChef(chef)}
            title="Ask NutriGuide AI how this chef fits your body goals"
            className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition border border-emerald-200/60"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </button>
        </div>
      </div>
    </div>
  );
};
