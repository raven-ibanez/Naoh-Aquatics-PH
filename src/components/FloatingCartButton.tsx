import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface FloatingCartButtonProps {
  itemCount: number;
  onCartClick: () => void;
}

const FloatingCartButton: React.FC<FloatingCartButtonProps> = ({ itemCount, onCartClick }) => {
  if (itemCount === 0) return null;

  return (
    <button
      onClick={onCartClick}
      className="fixed bottom-8 right-8 bg-gradient-to-br from-aquatic-teal via-aquatic-teal-dark to-aquatic-teal text-white p-6 rounded-3xl shadow-aquatic-lg hover:shadow-2xl hover:from-aquatic-lime hover:to-aquatic-lime-dark hover:text-aquatic-charcoal transition-all duration-300 transform hover:scale-110 active:scale-95 z-40 md:hidden border-4 border-white/50 backdrop-blur-sm group"
    >
      {/* Pulse ring */}
      <div className="absolute inset-0 rounded-3xl bg-aquatic-teal animate-ping opacity-20"></div>
      
      <div className="relative">
        <ShoppingCart className="h-8 w-8 group-hover:animate-wiggle" />
        <span className="absolute -top-4 -right-4 bg-gradient-to-br from-aquatic-orange via-aquatic-coral to-aquatic-orange text-white text-xs rounded-full h-7 w-7 flex items-center justify-center font-black shadow-coral animate-bounce-gentle border-3 border-white">
          {itemCount}
        </span>
      </div>
    </button>
  );
};

export default FloatingCartButton;