import React from 'react';
import { useCategories } from '../hooks/useCategories';

interface MobileNavProps {
  activeCategory: string;
  onCategoryClick: (categoryId: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeCategory, onCategoryClick }) => {
  const { categories } = useCategories();

  return (
    <div className="sticky top-16 z-40 bg-gradient-to-r from-aquatic-charcoal to-aquatic-charcoal-light backdrop-blur-sm border-b-2 border-aquatic-teal/30 md:hidden shadow-lg">
      <div className="flex overflow-x-auto scrollbar-hide px-4 py-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryClick(category.id)}
            className={`flex-shrink-0 flex items-center space-x-2 px-5 py-2.5 rounded-full mr-3 transition-all duration-200 border-2 transform hover:scale-105 ${
              activeCategory === category.id
                ? 'bg-gradient-to-r from-aquatic-teal to-aquatic-teal-dark text-white border-aquatic-teal shadow-lg shadow-aquatic-teal/50'
                : 'bg-aquatic-charcoal-light text-aquatic-teal border-aquatic-teal/50 hover:border-aquatic-teal hover:bg-aquatic-charcoal'
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <span className="text-sm font-semibold whitespace-nowrap">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;