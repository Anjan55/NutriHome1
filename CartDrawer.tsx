import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Clock, MapPin, CheckCircle2, Bike, ChefHat, Sparkles } from 'lucide-react';
import { CartItem, OrderDetails } from '../types.ts';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (dishId: string, delta: number) => void;
  onRemoveItem: (dishId: string) => void;
  onClearCart: () => void;
  targetProtein?: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  targetProtein,
}) => {
  const [deliverySlot, setDeliverySlot] = useState<string>('Lunch (12:30 PM - 1:30 PM)');
  const [address, setAddress] = useState<string>('442 Evergreen Terrace, Apt 3B');
  const [dietaryNote, setDietaryNote] = useState<string>('');
  const [placedOrder, setPlacedOrder] = useState<OrderDetails | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const totalAmount = items.reduce((acc, item) => {
    const unitPrice = item.planType === 'weekly' ? item.chef.weeklyPlanPrice : item.dish.price;
    return acc + unitPrice * item.quantity;
  }, 0);

  const totalCalories = items.reduce((acc, item) => acc + item.dish.calories * item.quantity, 0);
  const totalProtein = items.reduce((acc, item) => acc + item.dish.protein * item.quantity, 0);
  const totalCarbs = items.reduce((acc, item) => acc + item.dish.carbs * item.quantity, 0);
  const totalFat = items.reduce((acc, item) => acc + item.dish.fat * item.quantity, 0);

  const packagingFee = items.length > 0 ? 1.5 : 0;
  const finalTotal = totalAmount + packagingFee;

  const handleCheckout = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const order: OrderDetails = {
        id: `NH-${Math.floor(100000 + Math.random() * 900000)}`,
        items: [...items],
        totalAmount: finalTotal,
        totalProtein,
        totalCalories,
        deliverySlot,
        deliveryAddress: address,
        dietaryNote,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'kitchen_prepping',
      };
      setPlacedOrder(order);
      setIsSubmitting(false);
      onClearCart();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Your Fresh Meal Box</h2>
              <p className="text-xs text-slate-500">
                {items.length} {items.length === 1 ? 'item' : 'items'} in current order
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* If Order Placed: Live Tracking Screen */}
        {placedOrder ? (
          <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-center text-xl font-extrabold text-slate-900 mb-1">
                Order Confirmed!
              </h3>
              <p className="text-center text-xs text-slate-500 mb-6">
                Order ID: <span className="font-bold text-slate-800">{placedOrder.id}</span> · Placed at {placedOrder.createdAt}
              </p>

              {/* Progress Steps */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Order Received</div>
                    <div className="text-[11px] text-slate-500">Sent to home chef's sanitized kitchen</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 animate-pulse">
                    <ChefHat className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-800">Fresh Batch Prepping Now</div>
                    <div className="text-[11px] text-slate-500">Weighing macro portions & slow cooking</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center shrink-0">
                    <Bike className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400">Neighborhood Dispatch</div>
                    <div className="text-[11px] text-slate-400">Scheduled for {placedOrder.deliverySlot}</div>
                  </div>
                </div>
              </div>

              {/* Delivery Meta */}
              <div className="text-xs text-slate-600 space-y-1.5 bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100">
                <p><strong>Delivering to:</strong> {placedOrder.deliveryAddress}</p>
                <p><strong>Estimated Slot:</strong> {placedOrder.deliverySlot}</p>
                <p><strong>Total Macros:</strong> {placedOrder.totalProtein}g Protein · {placedOrder.totalCalories} kcal</p>
                {placedOrder.dietaryNote && (
                  <p><strong>Kitchen Note:</strong> {placedOrder.dietaryNote}</p>
                )}
              </div>
            </div>

            <button
              onClick={() => {
                setPlacedOrder(null);
                onClose();
              }}
              className="w-full mt-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
            >
              Back to Home Chefs
            </button>
          </div>
        ) : (
          /* Normal Cart List */
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col justify-between">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-slate-700">Your meal box is empty</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  Browse our certified home kitchens or ask NutriGuide AI to recommend dishes tailored to your body.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Live Macro Summary Header */}
                <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-200/80">
                  <div className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider mb-1.5 flex justify-between">
                    <span>This Box Supplies:</span>
                    <span>{totalCalories} kcal</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 text-center">
                    <div className="bg-white/90 p-1.5 rounded-lg border border-emerald-100">
                      <span className="block text-[9px] text-slate-400 font-semibold">Protein</span>
                      <span className="text-xs font-extrabold text-emerald-800">{totalProtein}g</span>
                      {targetProtein && (
                        <span className="text-[9px] text-slate-500 block">
                          of {targetProtein}g target
                        </span>
                      )}
                    </div>
                    <div className="bg-white/90 p-1.5 rounded-lg border border-emerald-100">
                      <span className="block text-[9px] text-slate-400 font-semibold">Carbs</span>
                      <span className="text-xs font-extrabold text-amber-800">{totalCarbs}g</span>
                    </div>
                    <div className="bg-white/90 p-1.5 rounded-lg border border-emerald-100">
                      <span className="block text-[9px] text-slate-400 font-semibold">Healthy Fat</span>
                      <span className="text-xs font-extrabold text-blue-800">{totalFat}g</span>
                    </div>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  {items.map((item) => {
                    const unitPrice =
                      item.planType === 'weekly' ? item.chef.weeklyPlanPrice : item.dish.price;
                    const itemTotal = unitPrice * item.quantity;

                    return (
                      <div
                        key={item.dish.id}
                        className="p-3 rounded-2xl border border-slate-200 bg-white shadow-2xs flex gap-3 items-center"
                      >
                        <img
                          src={item.dish.image}
                          alt={item.dish.name}
                          className="w-14 h-14 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {item.dish.name}
                          </h4>
                          <p className="text-[11px] text-slate-500 truncate">
                            By {item.chef.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                              {item.planType === 'weekly' ? '5-Day Plan' : 'Single Meal'}
                            </span>
                            <span className="text-xs font-bold text-slate-900">
                              ${itemTotal.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Quantity and Delete */}
                        <div className="flex flex-col items-end gap-1.5">
                          <div className="flex items-center gap-1.5 border border-slate-200 rounded-lg p-0.5">
                            <button
                              onClick={() => onUpdateQuantity(item.dish.id, -1)}
                              className="w-5 h-5 rounded flex items-center justify-center hover:bg-slate-100 text-slate-600"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.dish.id, 1)}
                              className="w-5 h-5 rounded flex items-center justify-center hover:bg-slate-100 text-slate-600"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => onRemoveItem(item.dish.id)}
                            className="text-slate-400 hover:text-rose-600 transition"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Delivery Options */}
                <div className="space-y-2.5 pt-2 border-t border-slate-100">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      Delivery Slot
                    </label>
                    <select
                      value={deliverySlot}
                      onChange={(e) => setDeliverySlot(e.target.value)}
                      className="w-full text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="Lunch (12:30 PM - 1:30 PM)">Lunch (12:30 PM - 1:30 PM)</option>
                      <option value="Dinner (7:30 PM - 8:30 PM)">Dinner (7:30 PM - 8:30 PM)</option>
                      <option value="Both Lunch & Dinner">Both Lunch & Dinner</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full text-xs font-medium px-2.5 py-1.5 rounded-xl border border-slate-200 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Chef Dietary Note (optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mild spice, no cilantro, low salt"
                      value={dietaryNote}
                      onChange={(e) => setDietaryNote(e.target.value)}
                      className="w-full text-xs font-medium px-2.5 py-1.5 rounded-xl border border-slate-200 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Bill Breakdown */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Food Subtotal</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Local Home Delivery</span>
                    <span className="text-emerald-600 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Eco Compostable Packaging</span>
                    <span>${packagingFee.toFixed(2)}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between font-extrabold text-sm text-slate-900">
                    <span>Total Amount</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            {items.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-200">
                <button
                  disabled={isSubmitting}
                  onClick={handleCheckout}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Placing Fresh Order...</span>
                  ) : (
                    <>
                      <span>Place Fresh Home Order (${finalTotal.toFixed(2)})</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
