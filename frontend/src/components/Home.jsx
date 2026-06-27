import React, { useState, useEffect } from 'react';

const heroImages = [
  '/hero_poster.png',
  '/movie_one.png',
  '/movie_two.png',
  '/movie_three.png'
];

const Home = () => {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [currentHeroImageIndex, setCurrentHeroImageIndex] = useState(0);

  // Auto scroll hero image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevImage = () => {
    setCurrentHeroImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const handleNextImage = () => {
    setCurrentHeroImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-6 border-b border-white/10 relative">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight">PopFlix</span>
            <span className="text-2xl">🍿</span>
          </div>
          <ul className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <li className="text-[#f3c669] font-medium cursor-pointer">Home</li>
            <li className="hover:text-white transition-colors cursor-pointer">Categories</li>
            <li className="hover:text-white transition-colors cursor-pointer">My List</li>
          </ul>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search" 
              className="bg-white text-black text-sm rounded-md pl-9 pr-4 py-1.5 focus:outline-none w-[250px]"
            />
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsLoginPopupOpen(!isLoginPopupOpen)}
              className="bg-[#f3c669] text-black text-sm font-medium px-4 py-1.5 rounded-md flex items-center gap-2 hover:bg-[#e0b55c] transition-colors"
            >
              Login/Sign Up
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-300 ${isLoginPopupOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Login Popup */}
            {isLoginPopupOpen && (
              <div className="absolute top-full right-0 mt-4 w-80 bg-[#1a1a1a] rounded-xl p-6 shadow-2xl border border-white/10 z-50">
                <div className="flex p-1 bg-black rounded-full mb-6">
                  <button 
                    onClick={() => setIsLoginMode(true)}
                    className={`flex-1 py-2 text-sm font-medium rounded-full transition-colors ${isLoginMode ? 'bg-[#f3c669] text-black' : 'text-gray-400 hover:text-white'}`}
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => setIsLoginMode(false)}
                    className={`flex-1 py-2 text-sm font-medium rounded-full transition-colors ${!isLoginMode ? 'bg-[#f3c669] text-black' : 'text-gray-400 hover:text-white'}`}
                  >
                    Sign Up
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Username</label>
                    <input type="text" className="w-full bg-white text-black px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-[#f3c669]" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Password</label>
                    <input type="password" className="w-full bg-white text-black px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-[#f3c669]" />
                  </div>
                  <button className="w-full bg-[#f3c669] text-black font-medium py-2.5 rounded-md mt-6 hover:bg-[#e0b55c] transition-colors">
                    {isLoginMode ? 'Login' : 'Sign Up'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-10 py-20 flex flex-col lg:flex-row justify-between items-center gap-10 border-b border-white/10">
        <div className="max-w-xl">
          <h1 className="text-6xl font-bold leading-tight mb-6">
            Stream the<br />Best of Cinema
          </h1>
          <p className="text-[#f3c669] text-sm leading-relaxed mb-12 max-w-sm">
            Access a curated selection of top-rated movies, exclusive premieres, and hidden gems. Elevate your viewing experience with high-definition streaming and personalized recommendations.
          </p>
          
          <div className="flex items-center gap-12">
            <div>
              <div className="text-3xl font-bold mb-1">250+</div>
              <div className="text-[#f3c669] text-xs">Movies available</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">450K+</div>
              <div className="text-[#f3c669] text-xs">People subscribed</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">200K+</div>
              <div className="text-[#f3c669] text-xs">Top review</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-[300px] h-[450px] rounded-lg overflow-hidden relative shadow-2xl shadow-black/50">
            <img src={heroImages[currentHeroImageIndex]} alt="Hero Movie" className="w-full h-full object-cover transition-opacity duration-500" />
          </div>
          <div className="flex items-center gap-4 mt-6">
            <button onClick={handlePrevImage} className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:bg-white/10 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex gap-2">
              {heroImages.map((_, index) => (
                <div 
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${currentHeroImageIndex === index ? 'bg-[#f3c669]' : 'bg-gray-600'}`}
                ></div>
              ))}
            </div>
            <button onClick={handleNextImage} className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:bg-white/10 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* New Release Section */}
      <section className="px-10 py-16 border-b border-white/10">
        <h2 className="text-2xl font-bold mb-10">New Release</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Card 1 */}
          <div className="relative group rounded-lg overflow-hidden aspect-[2/3]">
            <img src="/movie_one.png" alt="Movie One" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <h3 className="text-lg font-bold mb-1">Omni Loop</h3>
              <div className="flex items-center text-sm">
                <span className="text-[#f3c669] mr-1">★</span>
                <span>4.8</span>
                <span className="mx-2 text-gray-400">|</span>
                <span className="text-gray-300">Sci-Fi</span>
              </div>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="relative group rounded-lg overflow-hidden aspect-[2/3]">
            <img src="/movie_two.png" alt="Movie Two" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <h3 className="text-lg font-bold mb-1">Strange Darling</h3>
              <div className="flex items-center text-sm">
                <span className="text-[#f3c669] mr-1">★</span>
                <span>5.0</span>
                <span className="mx-2 text-gray-400">|</span>
                <span className="text-gray-300">Thriller</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative group rounded-lg overflow-hidden aspect-[2/3]">
            <img src="/movie_three.png" alt="Movie Three" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <h3 className="text-lg font-bold mb-1">Cuckoo</h3>
              <div className="flex items-center text-sm">
                <span className="text-[#f3c669] mr-1">★</span>
                <span>3.8</span>
                <span className="mx-2 text-gray-400">|</span>
                <span className="text-gray-300">Horror</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button className="bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors text-sm font-medium px-6 py-3 rounded-md flex items-center gap-2 text-gray-300 border border-white/5">
            LOAD MORE MOVIES
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </section>

      {/* Top 3 Movies Section */}
      <section className="px-10 py-20 border-b border-white/10">
        <h2 className="text-2xl font-bold mb-16">Top 3 Movies</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-20">
          {[
            { num: '1', img: '/hero_poster.png' },
            { num: '2', img: '/movie_two.png' },
            { num: '3', img: '/movie_three.png' },
          ].map((item) => (
            <div key={item.num} className="relative w-[200px] h-[300px]">
              <span 
                className="absolute -left-16 -top-8 text-[250px] font-bold text-transparent leading-none"
                style={{ 
                  WebkitTextStroke: '2px #f3c669',
                  zIndex: 0
                }}
              >
                {item.num}
              </span>
              <img 
                src={item.img} 
                alt={`Top ${item.num}`} 
                className="w-full h-full object-cover relative z-10 shadow-xl rounded-sm"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Footer / CTA Section */}
      <section className="px-10 py-20 flex flex-col md:flex-row items-center justify-between min-h-[400px] relative overflow-hidden">
        <div className="max-w-xl relative z-10">
          <p className="text-3xl md:text-4xl font-medium leading-tight mb-6">
            From blockbuster hits to hidden gems, we've got a movie for every taste. Continue browsing to find your perfect match.
          </p>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/2 flex justify-end items-center pointer-events-none">
          <img 
            src="/popcorn_img.png" 
            alt="Popcorn" 
            className="w-[800px] object-contain translate-x-1/4 translate-y-10 scale-125"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 40%)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 40%)' }}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
