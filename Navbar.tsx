import React from 'react';
import { ChefHat, Sparkles, Calculator, ShoppingBag, ShieldCheck, HeartPulse } from 'lucide-react';
import { CartItem } from '../types.ts';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenWizard: () => void;
  onOpenChat: () => void;
  userGoal?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onOpenCart,
  onOpenWizard,
  onOpenChat,
  userGoal,
}) => {
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo and Branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900">
                Nutri<span className="text-emerald-600">Home</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200/60">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                AI Guided
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden md:block">
              Certified Neighborhood Home Food Matched to Your Fitness Goals
            </p>
          </div>
        </div>

        {/* Project Dashboard Tag & Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Hygiene Certification Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>FSSAI & Hygiene Inspected</span>
          </div>

          {/* Goal Calculator Button */}
          <button
            onClick={onOpenWizard}
            className="flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 transition border border-slate-200 hover:border-emerald-200"
            title="Calculate your personalized daily calories and macros"
          >
            <Calculator className="w-4 h-4 text-emerald-600" />
            <span className="hidden md:inline">Macro Calculator</span>
            {userGoal && (
              <span className="hidden xl:inline text-[11px] bg-emerald-200/70 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                {userGoal}
              </span>
            )}
          </button>

          {/* AI Guide Trigger Button */}
          <button
            onClick={onOpenChat}
            className="relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-600/20 transition transform active:scale-95"
          >
            <Sparkles className="w-4 h-4 animate-pulse text-amber-300" />
            <span className="hidden sm:inline">NutriGuide AI</span>
            <span className="sm:hidden">AI Match</span>
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping absolute -top-1 -right-1" />
          </button>

          {/* Cart Trigger Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center justify-center p-2.5 sm:px-3.5 sm:py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm transition shadow-sm"
            aria-label="View meal cart"
          >
            <ShoppingBag className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Meal Box</span>
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 sm:relative sm:top-auto sm:right-auto sm:ml-2 w-5 h-5 sm:w-auto sm:h-auto sm:px-1.5 sm:py-0.2 rounded-full bg-emerald-500 text-white font-extrabold text-[11px] flex items-center justify-center">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
