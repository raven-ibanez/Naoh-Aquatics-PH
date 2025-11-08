import React from 'react';
import { useCategories } from '../hooks/useCategories';

interface SubNavProps {
  selectedCategory: string;
  onCategoryClick: (categoryId: string) => void;
}

const SubNav: React.FC<SubNavProps> = ({ selectedCategory, onCategoryClick }) => {
  const { categories, loading } = useCategories();

  return (
    <div className="sticky top-16 z-40 bg-gradient-to-r from-aquatic-charcoal to-aquatic-charcoal-light backdrop-blur-md border-b-2 border-aquatic-teal/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 overflow-x-auto py-4 scrollbar-hide">
          {loading ? (
            <div className="flex space-x-3">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="h-10 w-24 bg-aquatic-charcoal-light rounded-full animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <button
                onClick={() => onCategoryClick('all')}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border-2 whitespace-nowrap transform hover:scale-105 ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-aquatic-teal to-aquatic-teal-dark text-white border-aquatic-teal shadow-lg shadow-aquatic-teal/50'
                    : 'bg-aquatic-charcoal-light text-aquatic-teal border-aquatic-teal/50 hover:border-aquatic-teal hover:bg-aquatic-charcoal'
                }`}
              >
                💧 All Products
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onCategoryClick(c.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border-2 flex items-center space-x-2 whitespace-nowrap transform hover:scale-105 ${
                    selectedCategory === c.id
                      ? 'bg-gradient-to-r from-aquatic-teal to-aquatic-teal-dark text-white border-aquatic-teal shadow-lg shadow-aquatic-teal/50'
                      : 'bg-aquatic-charcoal-light text-aquatic-teal border-aquatic-teal/50 hover:border-aquatic-teal hover:bg-aquatic-charcoal'
                  }`}
                >
                  <span className="text-lg">{c.icon}</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubNav;


