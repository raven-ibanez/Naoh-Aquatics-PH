import React from 'react';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cartItems: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  onContinueShopping: () => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  updateQuantity,
  removeFromCart,
  clearCart,
  getTotalPrice,
  onContinueShopping,
  onCheckout
}) => {
  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center py-16 bg-gradient-to-br from-aquatic-bubble to-white rounded-2xl shadow-xl p-12">
          <div className="text-6xl mb-4">🐠</div>
          <h2 className="text-3xl font-pretendard font-bold mb-2">
            <span className="bg-gradient-to-r from-aquatic-teal to-aquatic-ocean bg-clip-text text-transparent">
              Your cart is empty
            </span>
          </h2>
          <p className="text-aquatic-charcoal/70 mb-8 text-lg">Add some premium aquatic supplies to get started! 🌊</p>
          <button
            onClick={onContinueShopping}
            className="bg-gradient-to-r from-aquatic-teal to-aquatic-teal-dark text-white px-8 py-4 rounded-full hover:from-aquatic-lime hover:to-aquatic-lime-dark hover:text-aquatic-charcoal transition-all duration-300 transform hover:scale-110 font-bold shadow-xl"
          >
            🛒 Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onContinueShopping}
          className="flex items-center space-x-2 text-aquatic-teal hover:text-aquatic-lime transition-colors duration-200 font-semibold"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Continue Shopping</span>
        </button>
        <h1 className="text-4xl font-pretendard font-bold">
          <span className="bg-gradient-to-r from-aquatic-teal to-aquatic-ocean bg-clip-text text-transparent">
            Your Cart 🛒
          </span>
        </h1>
        <button
          onClick={clearCart}
          className="text-aquatic-coral hover:text-aquatic-orange transition-colors duration-200 font-semibold"
        >
          Clear All
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border-4 border-aquatic-teal/20">
        {cartItems.map((item, index) => (
          <div key={item.id} className={`p-6 ${index !== cartItems.length - 1 ? 'border-b-2 border-aquatic-teal/10' : ''} bg-gradient-to-r from-white to-aquatic-bubble/10`}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-pretendard font-bold text-aquatic-charcoal mb-1">{item.name}</h3>
                {item.selectedVariation && (
                  <p className="text-sm text-aquatic-teal font-semibold mb-1">📏 Size: {item.selectedVariation.name}</p>
                )}
                {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                  <p className="text-sm text-aquatic-teal/80 font-medium mb-1">
                    ✨ Add-ons: {item.selectedAddOns.map(addOn => 
                      addOn.quantity && addOn.quantity > 1 
                        ? `${addOn.name} x${addOn.quantity}`
                        : addOn.name
                    ).join(', ')}
                  </p>
                )}
                <p className="text-lg font-bold bg-gradient-to-r from-aquatic-teal to-aquatic-ocean bg-clip-text text-transparent">₱{item.totalPrice} each</p>
              </div>
              
              <div className="flex items-center space-x-4 ml-4">
                <div className="flex items-center space-x-3 bg-gradient-to-r from-aquatic-lime/30 to-aquatic-teal/30 rounded-full p-1 border-2 border-aquatic-teal">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-aquatic-teal/20 rounded-full transition-colors duration-200"
                  >
                    <Minus className="h-4 w-4 text-aquatic-charcoal" />
                  </button>
                  <span className="font-bold text-aquatic-charcoal min-w-[32px] text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-aquatic-teal/20 rounded-full transition-colors duration-200"
                  >
                    <Plus className="h-4 w-4 text-aquatic-charcoal" />
                  </button>
                </div>
                
                <div className="text-right">
                  <p className="text-xl font-bold text-aquatic-coral">₱{(item.totalPrice * item.quantity).toFixed(2)}</p>
                </div>
                
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-aquatic-coral hover:text-aquatic-orange hover:bg-aquatic-coral/10 rounded-full transition-all duration-200 transform hover:scale-110"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-aquatic-bubble/30 to-aquatic-sand/30 rounded-2xl shadow-xl p-8 border-4 border-aquatic-teal">
        <div className="flex items-center justify-between text-3xl font-pretendard font-bold mb-6">
          <span className="text-aquatic-charcoal">Total:</span>
          <span className="bg-gradient-to-r from-aquatic-teal to-aquatic-ocean bg-clip-text text-transparent">
            ₱{parseFloat(getTotalPrice() || 0).toFixed(2)}
          </span>
        </div>
        
        <button
          onClick={onCheckout}
          className="w-full bg-gradient-to-r from-aquatic-teal to-aquatic-teal-dark text-white py-5 rounded-xl hover:from-aquatic-lime hover:to-aquatic-lime-dark hover:text-aquatic-charcoal transition-all duration-300 transform hover:scale-105 font-bold text-lg shadow-2xl border-4 border-white"
        >
          💳 Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;