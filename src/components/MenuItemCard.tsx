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
  const [showDetailModal, setShowDetailModal] = useState(false);
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
    // Directly add to cart with quantity of 1, skipping modals
    onAddToCart(item, 1, selectedVariation, []);
    setShowDetailModal(false);
    setSelectedQuantity(1);
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
      {/* Square Product Card */}
      <div 
        onClick={() => item.available && setShowDetailModal(true)}
        className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer border-2 border-aquatic-teal/30 hover:border-aquatic-teal hover:-translate-y-1 ${!item.available ? 'opacity-60 cursor-not-allowed' : ''}`}
      >
        {/* Square Image Container */}
        <div className="relative w-full aspect-square bg-gradient-to-br from-aquatic-bubble via-white to-aquatic-sand overflow-hidden">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          
          <div className={`absolute inset-0 flex items-center justify-center ${item.image ? 'hidden' : ''}`}>
            <div className="text-7xl opacity-30 text-aquatic-teal">🐠</div>
          </div>
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-20">
            {item.isOnDiscount && item.discountPrice && (
              <div className="bg-gradient-to-r from-aquatic-coral to-aquatic-orange text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                -{Math.round(((item.basePrice - item.discountPrice) / item.basePrice) * 100)}%
              </div>
            )}
            {item.popular && (
              <div className="bg-gradient-to-r from-aquatic-yellow to-aquatic-orange text-aquatic-charcoal text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                ⭐ POPULAR
              </div>
            )}
          </div>
          
          {!item.available && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white text-gray-800 text-sm font-bold px-4 py-2 rounded-full">
                UNAVAILABLE
              </div>
            </div>
          )}
        </div>
        
        {/* Product Info - Name and Price Only */}
        <div className="p-4 bg-white">
          <h4 className="text-base font-bold text-aquatic-charcoal leading-tight mb-2 line-clamp-2 min-h-[2.5rem] group-hover:text-aquatic-teal transition-colors">
            {item.name}
          </h4>
          
          <div>
            {item.isOnDiscount && item.discountPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-aquatic-coral">
                  ₱{item.discountPrice.toFixed(2)}
                </span>
                <span className="text-xs text-gray-500 line-through">
                  ₱{item.basePrice.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold bg-gradient-to-r from-aquatic-teal to-aquatic-ocean bg-clip-text text-transparent">
                ₱{item.basePrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 bg-aquatic-charcoal/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-aquatic-teal animate-scale-in">
            {/* Header with Close Button */}
            <div className="sticky top-0 bg-gradient-to-r from-aquatic-teal to-aquatic-teal-dark p-4 flex items-center justify-between rounded-t-3xl z-10">
              <h3 className="text-xl font-black text-white">Product Details</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-aquatic-teal-dark rounded-full transition-colors duration-200 border-2 border-white"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            <div className="p-6 bg-gradient-to-br from-aquatic-bubble/20 to-white">
              {/* Product Image */}
              <div className="relative w-full aspect-video bg-gradient-to-br from-aquatic-bubble via-white to-aquatic-sand overflow-hidden rounded-2xl mb-6 border-2 border-aquatic-teal/30">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-9xl opacity-30 text-aquatic-teal">🐠</div>
                  </div>
                )}
                
                {/* Badges on detail */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {item.isOnDiscount && item.discountPrice && (
                    <div className="bg-gradient-to-r from-aquatic-coral to-aquatic-orange text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                      💰 SAVE {Math.round(((item.basePrice - item.discountPrice) / item.basePrice) * 100)}%
                    </div>
                  )}
                  {item.popular && (
                    <div className="bg-gradient-to-r from-aquatic-yellow to-aquatic-orange text-aquatic-charcoal text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                      ⭐ POPULAR
                    </div>
                  )}
                </div>
              </div>

              {/* Product Details */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-aquatic-teal/20 mb-6">
                <h4 className="text-2xl font-bold text-aquatic-charcoal mb-3">{item.name}</h4>
                <p className="text-base text-aquatic-charcoal/80 mb-4 leading-relaxed">{item.description}</p>
                
                {/* Price */}
                <div className="flex items-center gap-4 mb-4">
                  {item.isOnDiscount && item.discountPrice ? (
                    <>
                      <span className="text-3xl font-black text-aquatic-coral">
                        ₱{item.discountPrice.toFixed(2)}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ₱{item.basePrice.toFixed(2)}
                      </span>
                      <span className="text-sm text-aquatic-teal font-semibold">
                        Save ₱{(item.basePrice - item.discountPrice).toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-black bg-gradient-to-r from-aquatic-teal to-aquatic-ocean bg-clip-text text-transparent">
                      ₱{item.basePrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Variations indicator */}
                {item.variations && item.variations.length > 0 && (
                  <div className="text-sm text-aquatic-teal bg-aquatic-bubble px-3 py-2 rounded-lg inline-block mb-4">
                    📏 {item.variations.length} size option{item.variations.length > 1 ? 's' : ''} available
                  </div>
                )}

                {/* Add-ons indicator */}
                {item.addOns && item.addOns.length > 0 && (
                  <div className="text-sm text-aquatic-teal bg-aquatic-bubble px-3 py-2 rounded-lg inline-block ml-2 mb-4">
                    ✨ {item.addOns.length} add-on{item.addOns.length > 1 ? 's' : ''} available
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-center text-aquatic-charcoal font-bold mb-4 text-lg">
                  Select Quantity
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

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full relative overflow-hidden bg-gradient-to-r from-aquatic-teal via-aquatic-teal-dark to-aquatic-teal text-white py-5 rounded-2xl transition-all duration-300 transform hover:scale-105 font-black text-lg shadow-aquatic-lg flex items-center justify-center space-x-3 border-4 border-white/30 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-aquatic-lime to-aquatic-lime-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <ShoppingCart className="h-6 w-6 relative z-10" />
                <span className="relative z-10">🛒 Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      )}

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