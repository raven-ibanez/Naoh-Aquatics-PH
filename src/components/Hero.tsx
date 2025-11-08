import React from 'react';
import { Waves, Fish, Droplets } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-aquatic-charcoal via-aquatic-ocean to-aquatic-charcoal py-32 px-4 overflow-hidden">
      {/* Animated bubble decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-aquatic-teal/30 rounded-full animate-bubble"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-10 left-10 animate-float">
          <Droplets className="w-20 h-20 text-aquatic-teal drop-shadow-lg" />
        </div>
        <div className="absolute top-20 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <Fish className="w-24 h-24 text-aquatic-lime drop-shadow-lg" />
        </div>
        <div className="absolute bottom-20 left-1/4 animate-float" style={{ animationDelay: '2s' }}>
          <Waves className="w-28 h-28 text-aquatic-teal-light drop-shadow-lg" />
        </div>
        <div className="absolute top-1/2 right-1/4 animate-float" style={{ animationDelay: '0.5s' }}>
          <Fish className="w-16 h-16 text-aquatic-coral drop-shadow-lg" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="mb-8 animate-slide-down">
          <span className="inline-block bg-gradient-to-r from-aquatic-teal via-aquatic-lime to-aquatic-teal text-aquatic-charcoal px-8 py-3 rounded-full text-sm font-bold tracking-widest shadow-2xl border-2 border-white/30 backdrop-blur-sm">
            🐠 PREMIUM AQUATIC SUPPLIES
          </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-pretendard font-black mb-8 animate-fade-in leading-tight">
          <span className="block text-white mb-3 drop-shadow-2xl">Your One-Stop Shop for</span>
          <span className="block bg-gradient-to-r from-aquatic-teal via-aquatic-lime to-aquatic-teal-light bg-clip-text text-transparent drop-shadow-xl animate-gradient">
            Quality Aquatic Care
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed font-medium drop-shadow-lg">
          Premium fish food, supplements, and aquarium essentials for healthy, vibrant aquatic life 🐟💙✨
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up">
          <a 
            href="#menu"
            className="group relative bg-gradient-to-r from-aquatic-teal via-aquatic-teal-dark to-aquatic-teal text-white px-12 py-5 rounded-full hover:shadow-aquatic-lg transition-all duration-300 transform hover:scale-110 font-bold text-lg shadow-2xl flex items-center space-x-3 overflow-hidden border-4 border-white/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-aquatic-lime to-aquatic-lime-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Waves className="w-6 h-6 relative z-10 group-hover:animate-wave" />
            <span className="relative z-10 group-hover:text-aquatic-charcoal">Shop Now</span>
          </a>
          <a 
            href="#menu"
            className="group relative bg-white/10 backdrop-blur-md text-white border-3 border-aquatic-teal px-12 py-5 rounded-full hover:bg-aquatic-teal hover:shadow-aquatic-lg transition-all duration-300 transform hover:scale-110 font-bold text-lg shadow-xl flex items-center space-x-3"
          >
            <Fish className="w-6 h-6 group-hover:animate-wiggle" />
            <span>View Products</span>
          </a>
        </div>

        {/* Decorative wave indicators */}
        <div className="mt-20 flex justify-center space-x-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="relative"
            >
              <div
                className="w-4 h-4 rounded-full bg-gradient-to-br from-aquatic-teal to-aquatic-lime shadow-lg animate-bounce-gentle"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
              <div
                className="absolute inset-0 w-4 h-4 rounded-full bg-aquatic-teal/50 animate-ping"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-24">
          <path
            fill="#00BCD4"
            fillOpacity="0.3"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;