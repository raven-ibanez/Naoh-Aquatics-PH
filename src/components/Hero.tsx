import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-white py-20 md:py-32 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <div className="mb-6">
          <span className="inline-block text-sm font-medium text-gray-600 tracking-wide uppercase">
            Premium Aquatic Supplies
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
          Your One-Stop Shop for<br/>
          <span className="text-aquatic-teal">Quality Aquatic Care</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Premium fish food, supplements, and aquarium essentials for healthy, vibrant aquatic life
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#menu"
            className="bg-aquatic-teal text-white px-8 py-3 rounded-lg hover:bg-aquatic-teal-dark transition-colors duration-200 font-medium"
          >
            Shop Now
          </a>
          <a 
            href="#menu"
            className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:border-aquatic-teal hover:text-aquatic-teal transition-colors duration-200 font-medium"
          >
            View Products
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
