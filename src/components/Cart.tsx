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
        <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-200 p-12">
          <div className="text-6xl mb-4">🐠</div>
          <h2 className="text-2xl font-bold mb-2 text-gray-900">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">Add some premium aquatic supplies to get started!</p>
          <button
            onClick={onContinueShopping}
            className="bg-aquatic-teal text-white px-8 py-3 rounded-lg hover:bg-aquatic-teal-dark transition-colors duration-200 font-medium"
          >
            Browse Products
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
          className="flex items-center space-x-2 text-gray-700 hover:text-aquatic-teal transition-colors duration-200 font-medium"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Continue Shopping</span>
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
        >
          Clear All
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
        {cartItems.map((item, index) => (
          <div key={item.id} className={`p-6 ${index !== cartItems.length - 1 ? 'border-b border-gray-200' : ''}`}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900 mb-1">{item.name}</h3>
                {item.selectedVariation && (
                  <p className="text-sm text-gray-600 mb-1">Size: {item.selectedVariation.name}</p>
                )}
                {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                  <p className="text-sm text-gray-600 mb-1">
                    Add-ons: {item.selectedAddOns.map(addOn => 
                      addOn.quantity && addOn.quantity > 1 
                        ? `${addOn.name} x${addOn.quantity}`
                        : addOn.name
                    ).join(', ')}
                  </p>
                )}
                <p className="text-base font-semibold text-gray-900">₱{item.totalPrice} each</p>
              </div>
              
              <div className="flex items-center space-x-4 ml-4">
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-gray-200 rounded-md transition-colors duration-200"
                  >
                    <Minus className="h-4 w-4 text-gray-700" />
                  </button>
                  <span className="font-medium text-gray-900 min-w-[32px] text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-gray-200 rounded-md transition-colors duration-200"
                  >
                    <Plus className="h-4 w-4 text-gray-700" />
                  </button>
                </div>
                
                <div className="text-right min-w-[80px]">
                  <p className="text-lg font-bold text-gray-900">₱{(item.totalPrice * item.quantity).toFixed(2)}</p>
                </div>
                
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-md transition-colors duration-200"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between text-2xl font-bold mb-6">
          <span className="text-gray-900">Total:</span>
          <span className="text-gray-900">
            ₱{parseFloat(getTotalPrice() || 0).toFixed(2)}
          </span>
        </div>
        
        <button
          onClick={onCheckout}
          className="w-full bg-aquatic-teal text-white py-4 rounded-lg hover:bg-aquatic-teal-dark transition-colors duration-200 font-medium text-base"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
