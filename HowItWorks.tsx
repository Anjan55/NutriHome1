import React from 'react';
import { Sparkles, ShieldCheck, Truck, Utensils, HeartHandshake, CheckCircle } from 'lucide-react';

interface HowItWorksProps {
  onOpenWizard: () => void;
  onOpenChat: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenWizard, onOpenChat }) => {
  return (
    <section className="py-16 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Why NutriHome
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How NutriHome Transformed Healthy Eating
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Real home chefs cooking with grandma's love and clinical nutritional precision.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200/80 flex flex-col justify-between hover:border-emerald-300 transition">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-lg mb-5 shadow-xs">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Biological AI Matching
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Tell NutriGuide AI your age, workout routine, and health parameters. Our engine calculates your exact protein, carb, and healthy fat quotas and matches you with specialized home kitchens.
              </p>
            </div>
            <button
              onClick={onOpenWizard}
              className="mt-6 text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5"
            >
              <span>Calculate your daily macros</span>
              <span>&rarr;</span>
            </button>
          </div>

          <div className="bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200/80 flex flex-col justify-between hover:border-emerald-300 transition">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-lg mb-5 shadow-xs">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Certified Sanitized Kitchens
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Every home chef undergoes rigorous hygiene audits, water purity verification, and FSSAI licensing. No industrial seed oils, zero artificial preservatives, and weighed portions.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs text-slate-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Average Hygiene Score: 99.2/100</span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200/80 flex flex-col justify-between hover:border-emerald-300 transition">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-lg mb-5 shadow-xs">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Fresh Neighborhood Delivery
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Prepared fresh 45 minutes before dispatch. Enjoy hot, nutritious tiffins delivered right to your home or office on flexible daily schedules or single trial boxes.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>Eco-insulated compostable meal boxes</span>
            </div>
          </div>
        </div>

        {/* Nutritional Standards Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400">
              The NutriHome Standard
            </span>
            <h3 className="text-xl sm:text-2xl font-black mt-1">
              Never Settle For Industrial Oily Takeaways Again
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              We believe sustainable fitness starts with food you actually look forward to eating every single day.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Wood-pressed & olive oils only</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero palm oil or MSG</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Gram-accurate macro cards</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Weekly meal rotating menus</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <button
              onClick={onOpenChat}
              className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Ask NutriGuide AI</span>
            </button>
            <button
              onClick={onOpenWizard}
              className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition text-center"
            >
              Calculate Macros
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
