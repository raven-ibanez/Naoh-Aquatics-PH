import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useSiteSettings } from '../hooks/useSiteSettings';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartClick, onMenuClick }) => {
  const { siteSettings, loading } = useSiteSettings();

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-aquatic-charcoal via-aquatic-charcoal-light to-aquatic-charcoal backdrop-blur-xl border-b-4 border-aquatic-teal shadow-2xl">
      {/* Subtle shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-aquatic-teal/5 to-transparent shimmer pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-18 py-2">
          <button 
            onClick={onMenuClick}
            className="flex items-center space-x-3 text-white hover:text-aquatic-lime transition-colors duration-200 group"
          >
            {loading ? (
              <div className="w-12 h-12 bg-aquatic-charcoal-light rounded-full animate-pulse" />
            ) : (
              <img 
                src={siteSettings?.site_logo || "/logo.jpg"} 
                alt={siteSettings?.site_name || "Noah Aquatics PH"}
                className="w-12 h-12 rounded-full object-cover ring-4 ring-aquatic-teal shadow-lg group-hover:ring-aquatic-lime transition-all duration-200"
                onError={(e) => {
                  e.currentTarget.src = "/logo.jpg";
                }}
              />
            )}
            <div className="flex flex-col -space-y-1">
              <h1 className="text-3xl font-pretendard font-black bg-gradient-to-r from-aquatic-teal via-aquatic-lime to-aquatic-teal bg-clip-text text-transparent animate-gradient drop-shadow-lg">
                {loading ? (
                  <div className="w-24 h-6 bg-aquatic-charcoal-light rounded animate-pulse" />
                ) : (
                  "NOAH"
                )}
              </h1>
              <span className="text-xs text-aquatic-teal font-bold tracking-[0.25em] drop-shadow-sm">AQUATICS</span>
            </div>
          </button>

          <div className="flex items-center space-x-2">
            <button 
              onClick={onCartClick}
              className="relative p-3 text-aquatic-teal hover:text-white hover:bg-gradient-to-br hover:from-aquatic-teal hover:to-aquatic-teal-dark rounded-2xl transition-all duration-300 border-2 border-aquatic-teal/50 hover:border-aquatic-lime hover:shadow-aquatic transform hover:scale-105"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-br from-aquatic-orange via-aquatic-coral to-aquatic-orange text-white text-xs rounded-full h-7 w-7 flex items-center justify-center font-black animate-bounce-gentle shadow-coral border-2 border-white">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;