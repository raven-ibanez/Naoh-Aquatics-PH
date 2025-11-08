import React, { useState } from 'react';
import { Plus, Minus, X, ShoppingCart } from 'lucide-react';
import { MenuItem, Variation, AddOn } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, quantity?: number, variation?: Variation, addOns?: AddOn[]) => void;
  quantity: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ 
  item, 
  onAddToCart, 
  quantity, 
  onUpdateQuantity 
}) => {
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showCustomization, setShowCustomization] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState<Variation | undefined>(
    item.variations?.[0]
  );
  const [selectedAddOns, setSelectedAddOns] = useState<(AddOn & { quantity: number })[]>([]);

  const calculatePrice = () => {
    // Use effective price (discounted or regular) as base
    let price = item.effectivePrice || item.basePrice;
    if (selectedVariation) {
      price = (item.effectivePrice || item.basePrice) + selectedVariation.price;
    }
    selectedAddOns.forEach(addOn => {
      price += addOn.price * addOn.quantity;
    });
    return price;
  };

  const handleAddToCart = () => {
    setSelectedQuantity(1);
    setShowQuantityModal(true);
  };

  const handleQuantityConfirm = () => {
    setShowQuantityModal(false);
    if (item.variations?.length || item.addOns?.length) {
      setShowCustomization(true);
    } else {
      onAddToCart(item, selectedQuantity);
      setSelectedQuantity(1);
    }
  };

  const handleCustomizedAddToCart = () => {
    // Convert selectedAddOns back to regular AddOn array for cart
    const addOnsForCart: AddOn[] = selectedAddOns.flatMap(addOn => 
      Array(addOn.quantity).fill({ ...addOn, quantity: undefined })
    );
    onAddToCart(item, selectedQuantity, selectedVariation, addOnsForCart);
    setShowCustomization(false);
    setSelectedAddOns([]);
    setSelectedQuantity(1);
  };

  const handleIncrement = () => {
    onUpdateQuantity(item.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      onUpdateQuantity(item.id, quantity - 1);
    }
  };

  const updateAddOnQuantity = (addOn: AddOn, quantity: number) => {
    setSelectedAddOns(prev => {
      const existingIndex = prev.findIndex(a => a.id === addOn.id);
      
      if (quantity === 0) {
        // Remove add-on if quantity is 0
        return prev.filter(a => a.id !== addOn.id);
      }
      
      if (existingIndex >= 0) {
        // Update existing add-on quantity
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], quantity };
        return updated;
      } else {
        // Add new add-on with quantity
        return [...prev, { ...addOn, quantity }];
      }
    });
  };

  const groupedAddOns = item.addOns?.reduce((groups, addOn) => {
    const category = addOn.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(addOn);
    return groups;
  }, {} as Record<string, AddOn[]>);

  return (
    <>
      <div className={`relative bg-white rounded-3xl shadow-aquatic hover:shadow-aquatic-lg transition-all duration-500 overflow-hidden group animate-scale-in border-2 border-aquatic-teal/30 hover:border-aquatic-teal hover:-translate-y-2 ${!item.available ? 'opacity-60' : ''}`}>
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer opacity-0 group-hover:opacity-100 pointer-events-none z-10"></div>
        
        {/* Image Container with Badges */}
        <div className="relative h-56 bg-gradient-to-br from-aquatic-bubble via-white to-aquatic-sand overflow-hidden">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-aquatic-teal via-transparent to-transparent"></div>
          </div>

          <div className={`absolute inset-0 flex items-center justify-center ${item.image ? 'hidden' : ''}`}>
            <div className="text-7xl opacity-30 text-aquatic-teal animate-float">🐠</div>
          </div>
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
            {item.isOnDiscount && item.discountPrice && (
              <div className="bg-gradient-to-r from-aquatic-coral to-aquatic-orange text-white text-xs font-bold px-4 py-2 rounded-full shadow-coral animate-pulse backdrop-blur-sm border-2 border-white/50">
                💰 SALE
              </div>
            )}
            {item.popular && (
              <div className="bg-gradient-to-r from-aquatic-yellow to-aquatic-orange text-aquatic-charcoal text-xs font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm border-2 border-white/50 animate-bounce-gentle">
                ⭐ POPULAR
              </div>
            )}
          </div>
          
          {!item.available && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm border-2 border-white/50">
              UNAVAILABLE
            </div>
          )}
          
          {/* Discount Percentage Badge */}
          {item.isOnDiscount && item.discountPrice && (
            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md text-aquatic-coral text-sm font-black px-4 py-2 rounded-full shadow-coral border-3 border-aquatic-coral animate-pulse">
              -{Math.round(((item.basePrice - item.discountPrice) / item.basePrice) * 100)}%
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-6 bg-gradient-to-br from-white via-aquatic-bubble/10 to-white relative">
          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-aquatic-teal/5 to-transparent rounded-bl-3xl"></div>
          
          <div className="flex items-start justify-between mb-3 relative z-10">
            <h4 className="text-lg font-bold text-aquatic-charcoal leading-tight flex-1 pr-2 group-hover:text-aquatic-teal transition-colors duration-300">{item.name}</h4>
            {item.variations && item.variations.length > 0 && (
              <div className="text-xs text-aquatic-teal bg-gradient-to-r from-aquatic-bubble to-aquatic-teal/10 px-3 py-1.5 rounded-full whitespace-nowrap font-bold border-2 border-aquatic-teal/30 shadow-sm">
                {item.variations.length} sizes
              </div>
            )}
          </div>
          
          <p className={`text-sm mb-4 leading-relaxed ${!item.available ? 'text-gray-400' : 'text-aquatic-charcoal/80'}`}>
            {!item.available ? 'Currently Unavailable' : item.description}
          </p>
          
          {/* Pricing Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              {item.isOnDiscount && item.discountPrice ? (
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-aquatic-coral">
                      ₱{item.discountPrice.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ₱{item.basePrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xs text-aquatic-teal font-semibold">
                    💰 Save ₱{(item.basePrice - item.discountPrice).toFixed(2)}
                  </div>
                </div>
              ) : (
                <div className="text-2xl font-bold bg-gradient-to-r from-aquatic-teal to-aquatic-ocean bg-clip-text text-transparent">
                  ₱{item.basePrice.toFixed(2)}
                </div>
              )}
              
              {item.variations && item.variations.length > 0 && (
                <div className="text-xs text-aquatic-teal/70 mt-1 font-medium">
                  Starting price
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex-shrink-0">
              {!item.available ? (
                <button
                  disabled
                  className="bg-gray-200 text-gray-500 px-4 py-2.5 rounded-xl cursor-not-allowed font-medium text-sm"
                >
                  Unavailable
                </button>
              ) : quantity === 0 ? (
                <button
                  onClick={handleAddToCart}
                  className="relative overflow-hidden bg-gradient-to-r from-aquatic-teal via-aquatic-teal-dark to-aquatic-teal text-white px-7 py-3 rounded-2xl hover:shadow-aquatic-lg transition-all duration-300 transform hover:scale-110 font-bold text-sm shadow-aquatic border-2 border-aquatic-teal-light/30 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-aquatic-lime to-aquatic-lime-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center space-x-1">
                    <span>{item.variations?.length || item.addOns?.length ? '⚙️ Customize' : '🛒 Add'}</span>
                  </span>
                </button>
              ) : (
                <div className="flex items-center space-x-2 bg-gradient-to-r from-aquatic-lime/40 via-aquatic-teal/30 to-aquatic-lime/40 rounded-2xl p-1.5 border-2 border-aquatic-teal shadow-lime">
                  <button
                    onClick={handleDecrement}
                    className="p-2.5 hover:bg-white/80 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
                  >
                    <Minus className="h-4 w-4 text-aquatic-charcoal" />
                  </button>
                  <span className="font-black text-aquatic-charcoal min-w-[32px] text-center text-base bg-white/50 px-2 py-1 rounded-lg">{quantity}</span>
                  <button
                    onClick={handleIncrement}
                    className="p-2.5 hover:bg-white/80 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
                  >
                    <Plus className="h-4 w-4 text-aquatic-charcoal" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Add-ons indicator */}
          {item.addOns && item.addOns.length > 0 && (
            <div className="flex items-center space-x-2 text-xs text-aquatic-teal bg-gradient-to-r from-aquatic-bubble to-aquatic-sand px-4 py-2 rounded-xl font-bold border-2 border-aquatic-teal/20 shadow-sm hover:shadow-md transition-shadow duration-300">
              <span className="text-base">✨</span>
              <span>{item.addOns.length} add-on{item.addOns.length > 1 ? 's' : ''} available</span>
            </div>
          )}
        </div>
      </div>

      {/* Quantity Selector Modal */}
      {showQuantityModal && (
        <div className="fixed inset-0 bg-aquatic-charcoal/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border-4 border-aquatic-teal overflow-hidden animate-scale-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-aquatic-teal to-aquatic-teal-dark p-6 text-center relative">
              <button
                onClick={() => {
                  setShowQuantityModal(false);
                  setSelectedQuantity(1);
                }}
                className="absolute top-4 right-4 p-2 hover:bg-aquatic-teal-dark rounded-full transition-colors duration-200 border-2 border-white"
              >
                <X className="h-5 w-5 text-white" />
              </button>
              <h3 className="text-2xl font-black text-white mb-2">Select Quantity</h3>
              <p className="text-aquatic-bubble text-sm">How many would you like to add?</p>
            </div>

            {/* Product Info */}
            <div className="p-6 bg-gradient-to-br from-aquatic-bubble/20 to-white">
              <div className="bg-white rounded-2xl p-4 shadow-sm border-2 border-aquatic-teal/20 mb-6">
                <h4 className="font-bold text-aquatic-charcoal mb-2 text-lg">{item.name}</h4>
                <p className="text-sm text-aquatic-charcoal/70 mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-aquatic-teal font-semibold">Price per item:</span>
                  <span className="text-2xl font-black bg-gradient-to-r from-aquatic-teal to-aquatic-ocean bg-clip-text text-transparent">
                    ₱{(item.effectivePrice || item.basePrice).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-center text-aquatic-charcoal font-bold mb-4 text-lg">
                  Quantity
                </label>
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                    className="p-4 bg-gradient-to-br from-aquatic-lime/40 to-aquatic-teal/40 hover:from-aquatic-lime/60 hover:to-aquatic-teal/60 rounded-2xl transition-all duration-200 transform hover:scale-110 active:scale-95 border-2 border-aquatic-teal shadow-aquatic"
                  >
                    <Minus className="h-6 w-6 text-aquatic-charcoal" />
                  </button>
                  
                  <div className="bg-gradient-to-br from-aquatic-bubble to-aquatic-sand rounded-2xl px-12 py-6 border-4 border-aquatic-teal shadow-aquatic">
                    <span className="text-5xl font-black bg-gradient-to-r from-aquatic-teal to-aquatic-ocean bg-clip-text text-transparent">
                      {selectedQuantity}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                    className="p-4 bg-gradient-to-br from-aquatic-teal/40 to-aquatic-lime/40 hover:from-aquatic-teal/60 hover:to-aquatic-lime/60 rounded-2xl transition-all duration-200 transform hover:scale-110 active:scale-95 border-2 border-aquatic-teal shadow-aquatic"
                  >
                    <Plus className="h-6 w-6 text-aquatic-charcoal" />
                  </button>
                </div>
              </div>

              {/* Total Price */}
              <div className="bg-gradient-to-r from-aquatic-bubble/30 to-aquatic-sand/30 rounded-2xl p-6 mb-6 border-2 border-aquatic-teal/30">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-aquatic-charcoal">Total Price:</span>
                  <span className="text-3xl font-black bg-gradient-to-r from-aquatic-teal to-aquatic-ocean bg-clip-text text-transparent">
                    ₱{((item.effectivePrice || item.basePrice) * selectedQuantity).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleQuantityConfirm}
                className="w-full relative overflow-hidden bg-gradient-to-r from-aquatic-teal via-aquatic-teal-dark to-aquatic-teal text-white py-5 rounded-2xl transition-all duration-300 transform hover:scale-105 font-black text-lg shadow-aquatic-lg flex items-center justify-center space-x-3 border-4 border-white/30 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-aquatic-lime to-aquatic-lime-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <ShoppingCart className="h-6 w-6 relative z-10" />
                <span className="relative z-10">
                  {item.variations?.length || item.addOns?.length ? '⚙️ Continue to Customize' : '🛒 Add to Cart'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customization Modal */}
      {showCustomization && (
        <div className="fixed inset-0 bg-aquatic-charcoal/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-aquatic-teal">
            <div className="sticky top-0 bg-gradient-to-r from-aquatic-teal to-aquatic-teal-dark border-b-4 border-aquatic-lime p-6 flex items-center justify-between rounded-t-2xl">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">Customize {item.name}</h3>
                <div className="flex items-center space-x-3 mt-2">
                  <p className="text-sm text-aquatic-bubble">🎨 Choose your preferences</p>
                  <div className="bg-aquatic-lime/20 px-3 py-1 rounded-full border-2 border-aquatic-lime">
                    <span className="text-xs font-bold text-white">Qty: {selectedQuantity}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowCustomization(false);
                  setSelectedQuantity(1);
                }}
                className="p-2 hover:bg-aquatic-teal-dark rounded-full transition-colors duration-200 border-2 border-white"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            <div className="p-6 bg-gradient-to-br from-aquatic-bubble/20 to-white">
              {/* Size Variations */}
              {item.variations && item.variations.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-bold text-aquatic-charcoal mb-4 flex items-center space-x-2">
                    <span>📏 Choose Size</span>
                  </h4>
                  <div className="space-y-3">
                    {item.variations.map((variation) => (
                      <label
                        key={variation.id}
                        className={`flex items-center justify-between p-4 border-3 rounded-xl cursor-pointer transition-all duration-200 ${
                          selectedVariation?.id === variation.id
                            ? 'border-aquatic-teal bg-gradient-to-r from-aquatic-teal/20 to-aquatic-lime/20 shadow-lg'
                            : 'border-gray-200 hover:border-aquatic-teal/50 hover:bg-aquatic-bubble/30'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="variation"
                            checked={selectedVariation?.id === variation.id}
                            onChange={() => setSelectedVariation(variation)}
                            className="text-aquatic-teal focus:ring-aquatic-teal"
                          />
                          <span className="font-bold text-aquatic-charcoal">{variation.name}</span>
                        </div>
                        <span className="text-aquatic-teal font-bold">
                          ₱{((item.effectivePrice || item.basePrice) + variation.price).toFixed(2)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Add-ons */}
              {groupedAddOns && Object.keys(groupedAddOns).length > 0 && (
                <div className="mb-6">
                  <h4 className="font-bold text-aquatic-charcoal mb-4 flex items-center space-x-2">
                    <span>✨ Add-ons</span>
                  </h4>
                  {Object.entries(groupedAddOns).map(([category, addOns]) => (
                    <div key={category} className="mb-4">
                      <h5 className="text-sm font-bold text-aquatic-teal mb-3 capitalize bg-aquatic-bubble px-3 py-1.5 rounded-lg">
                        {category.replace('-', ' ')}
                      </h5>
                      <div className="space-y-3">
                        {addOns.map((addOn) => (
                          <div
                            key={addOn.id}
                            className="flex items-center justify-between p-4 border-2 border-aquatic-teal/30 rounded-xl hover:border-aquatic-teal hover:bg-aquatic-bubble/30 transition-all duration-200"
                          >
                            <div className="flex-1">
                              <span className="font-bold text-aquatic-charcoal">{addOn.name}</span>
                              <div className="text-sm text-aquatic-teal font-semibold">
                                {addOn.price > 0 ? `₱${addOn.price.toFixed(2)} each` : '✨ Free'}
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {selectedAddOns.find(a => a.id === addOn.id) ? (
                                <div className="flex items-center space-x-2 bg-gradient-to-r from-aquatic-lime/30 to-aquatic-teal/30 rounded-xl p-1 border-2 border-aquatic-teal">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const current = selectedAddOns.find(a => a.id === addOn.id);
                                      updateAddOnQuantity(addOn, (current?.quantity || 1) - 1);
                                    }}
                                    className="p-1.5 hover:bg-aquatic-teal/20 rounded-lg transition-colors duration-200"
                                  >
                                    <Minus className="h-3 w-3 text-aquatic-charcoal" />
                                  </button>
                                  <span className="font-bold text-aquatic-charcoal min-w-[24px] text-center text-sm">
                                    {selectedAddOns.find(a => a.id === addOn.id)?.quantity || 0}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const current = selectedAddOns.find(a => a.id === addOn.id);
                                      updateAddOnQuantity(addOn, (current?.quantity || 0) + 1);
                                    }}
                                    className="p-1.5 hover:bg-aquatic-teal/20 rounded-lg transition-colors duration-200"
                                  >
                                    <Plus className="h-3 w-3 text-aquatic-charcoal" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => updateAddOnQuantity(addOn, 1)}
                                  className="flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-aquatic-teal to-aquatic-teal-dark text-white rounded-xl hover:from-aquatic-lime hover:to-aquatic-lime-dark hover:text-aquatic-charcoal transition-all duration-200 text-sm font-bold shadow-lg"
                                >
                                  <Plus className="h-3 w-3" />
                                  <span>Add</span>
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Price Summary */}
              <div className="border-t-4 border-aquatic-teal/30 pt-4 mb-6 bg-gradient-to-r from-aquatic-bubble/30 to-aquatic-sand/30 p-4 rounded-xl">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-aquatic-charcoal/70">
                    <span>Price per item:</span>
                    <span className="font-semibold">₱{calculatePrice().toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-aquatic-charcoal/70">
                    <span>Quantity:</span>
                    <span className="font-semibold">× {selectedQuantity}</span>
                  </div>
                  <div className="border-t-2 border-aquatic-teal/20 pt-2 flex items-center justify-between text-2xl font-bold">
                    <span className="text-aquatic-charcoal">Total:</span>
                    <span className="bg-gradient-to-r from-aquatic-teal to-aquatic-ocean bg-clip-text text-transparent">₱{(calculatePrice() * selectedQuantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCustomizedAddToCart}
                className="w-full bg-gradient-to-r from-aquatic-teal to-aquatic-teal-dark text-white py-4 rounded-xl hover:from-aquatic-lime hover:to-aquatic-lime-dark hover:text-aquatic-charcoal transition-all duration-200 font-bold flex items-center justify-center space-x-2 shadow-2xl hover:shadow-xl transform hover:scale-105 border-4 border-white"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>🛒 Add {selectedQuantity} to Cart - ₱{(calculatePrice() * selectedQuantity).toFixed(2)}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuItemCard;