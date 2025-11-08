import React from 'react';
import { MenuItem, CartItem } from '../types';
import { useCategories } from '../hooks/useCategories';
import MenuItemCard from './MenuItemCard';
import MobileNav from './MobileNav';

// Preload images for better performance
const preloadImages = (items: MenuItem[]) => {
  items.forEach(item => {
    if (item.image) {
      const img = new Image();
      img.src = item.image;
    }
  });
};

interface MenuProps {
  menuItems: MenuItem[];
  addToCart: (item: MenuItem, quantity?: number, variation?: any, addOns?: any[]) => void;
  cartItems: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
}

const Menu: React.FC<MenuProps> = ({ menuItems, addToCart, cartItems, updateQuantity }) => {
  const { categories } = useCategories();
  const [activeCategory, setActiveCategory] = React.useState('hot-coffee');

  // Preload images when menu items change
  React.useEffect(() => {
    if (menuItems.length > 0) {
      // Preload images for visible category first
      const visibleItems = menuItems.filter(item => item.category === activeCategory);
      preloadImages(visibleItems);
      
      // Then preload other images after a short delay
      setTimeout(() => {
        const otherItems = menuItems.filter(item => item.category !== activeCategory);
        preloadImages(otherItems);
      }, 1000);
    }
  }, [menuItems, activeCategory]);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      const headerHeight = 64; // Header height
      const mobileNavHeight = 60; // Mobile nav height
      const offset = headerHeight + mobileNavHeight + 20; // Extra padding
      const elementPosition = element.offsetTop - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  React.useEffect(() => {
    if (categories.length > 0) {
      // Set default to dim-sum if it exists, otherwise first category
      const defaultCategory = categories.find(cat => cat.id === 'dim-sum') || categories[0];
      if (!categories.find(cat => cat.id === activeCategory)) {
        setActiveCategory(defaultCategory.id);
      }
    }
  }, [categories, activeCategory]);

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = categories.map(cat => document.getElementById(cat.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveCategory(categories[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <>
      <MobileNav 
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-aquatic-teal to-transparent rounded-full"></div>
        
        <div className="inline-block mb-4">
          <div className="bg-gradient-to-r from-aquatic-bubble via-aquatic-teal/10 to-aquatic-bubble px-6 py-2 rounded-full border-2 border-aquatic-teal/20">
            <span className="text-aquatic-teal font-bold text-sm tracking-wider">🌊 EXPLORE OUR COLLECTION</span>
          </div>
        </div>
        
        <h2 className="text-6xl md:text-7xl font-pretendard font-black mb-6 animate-fade-in">
          <span className="bg-gradient-to-r from-aquatic-teal via-aquatic-ocean to-aquatic-teal bg-clip-text text-transparent animate-gradient drop-shadow-lg">
            Premium Aquatic Products
          </span>
        </h2>
        
        <p className="text-aquatic-charcoal/80 text-xl max-w-3xl mx-auto leading-relaxed font-medium">
          Discover our comprehensive selection of high-quality fish food, color enhancers, probiotics, 
          and essential aquarium supplies for healthy and vibrant aquatic life 🐠✨
        </p>
        
        {/* Decorative wave */}
        <div className="mt-8 flex justify-center space-x-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-aquatic-teal/50 animate-bounce-gentle" style={{ animationDelay: `${i * 0.1}s` }}></div>
          ))}
        </div>
      </div>

      {categories.map((category) => {
        const categoryItems = menuItems.filter(item => item.category === category.id);
        
        if (categoryItems.length === 0) return null;
        
        return (
          <section key={category.id} id={category.id} className="mb-20 animate-fade-in">
            <div className="relative flex items-center mb-10 pb-6 border-b-2 border-gradient-to-r from-transparent via-aquatic-teal/30 to-transparent">
              {/* Decorative line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-aquatic-teal to-transparent"></div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-aquatic-teal/20 blur-xl rounded-full animate-pulse-slow"></div>
                <span className="relative text-5xl mr-6 bg-gradient-to-br from-aquatic-teal via-aquatic-lime to-aquatic-teal p-4 rounded-2xl shadow-aquatic border-2 border-aquatic-teal/30 inline-block transform hover:scale-110 transition-transform duration-300">{category.icon}</span>
              </div>
              
              <div>
                <h3 className="text-4xl md:text-5xl font-pretendard font-black bg-gradient-to-r from-aquatic-ocean via-aquatic-teal to-aquatic-lime bg-clip-text text-transparent animate-gradient drop-shadow-sm">{category.name}</h3>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-12 h-1 bg-gradient-to-r from-aquatic-teal to-transparent rounded-full"></div>
                  <span className="text-xs text-aquatic-teal/60 font-semibold tracking-wider uppercase">Quality Products</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryItems.map((item) => {
                const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
                return (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    onAddToCart={addToCart}
                    quantity={cartItem?.quantity || 0}
                    onUpdateQuantity={updateQuantity}
                  />
                );
              })}
            </div>
          </section>
        );
      })}
      </main>
    </>
  );
};

export default Menu;