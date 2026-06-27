import React, { useState, useEffect } from 'react';

import { moviesData } from '../data/movies.js';

const Dashboard = ({ onViewChange }) => {
  const [currentHeroImageIndex, setCurrentHeroImageIndex] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileData, setProfileData] = useState({ username: 'Loading...', password: 'Loading...' });
  const [displayCount, setDisplayCount] = useState(4);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isProfileOpen && profileData.username === 'Loading...') {
      const token = localStorage.getItem('token');
      if (token) {
        // Change to http://localhost:3000/api/auth/profile for local testing
        fetch('https://popflix-lp68.onrender.com/api/auth/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
          if (data.name) {
            setProfileData({ username: data.name, password: data.password });
          } else {
            setProfileData({ username: 'Not Found', password: 'Not Found' });
          }
        })
        .catch(err => {
          console.error('Failed to fetch profile:', err);
          setProfileData({ username: 'Error', password: 'Error' });
        });
      }
    }
  }, [isProfileOpen, profileData.username]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    window.location.reload();
  };

  // Auto scroll hero image every 3 seconds
  useEffect(() => {
    if (selectedMovie) return; // Don't auto-scroll when a movie is selected
    
    const interval = setInterval(() => {
      setCurrentHeroImageIndex((prev) => (prev + 1) % moviesData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedMovie]);

  const handlePrevImage = () => {
    setCurrentHeroImageIndex((prev) => (prev - 1 + moviesData.length) % moviesData.length);
  };

  const handleNextImage = () => {
    setCurrentHeroImageIndex((prev) => (prev + 1) % moviesData.length);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setDisplayCount(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const otherMovies = selectedMovie 
    ? moviesData.filter(m => m.id !== selectedMovie.id).slice(0, displayCount) 
    : moviesData.slice(0, displayCount);

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 md:px-10 py-4 md:py-6 border-b border-white/10 relative z-20 bg-[#0a0a0a]">
        <div className="flex items-center gap-4 md:gap-10">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setSelectedMovie(null); setDisplayCount(4); }}>
            <span className="text-xl md:text-2xl font-bold tracking-tight">PopFlix</span>
            <span className="text-xl md:text-2xl">🍿</span>
          </div>
          <ul className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <li className="text-[#f3c669] font-medium cursor-pointer" onClick={() => { setSelectedMovie(null); setDisplayCount(4); }}>Home</li>
            <li className="hover:text-white transition-colors cursor-pointer">Categories</li>
            <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onViewChange && onViewChange('mylist')}>My List</li>
          </ul>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="relative hidden md:block">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search" 
              className="bg-white text-black text-sm rounded-md pl-9 pr-4 py-1.5 focus:outline-none w-[150px] lg:w-[250px]"
            />
          </div>
          
          <div className="relative hidden md:block">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-10 h-10 rounded-full border border-[#f3c669] text-[#f3c669] flex items-center justify-center hover:bg-[#f3c669]/10 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-4 w-64 bg-[#1e1e1e] border border-white/10 p-6 shadow-2xl z-50 rounded-md">
                <h3 className="text-[#f3c669] text-xl font-medium mb-6">My Profile</h3>
                
                <div className="mb-4">
                  <div className="text-[#f3c669] text-xs mb-1">Username</div>
                  <div className="text-white text-sm font-medium">{profileData.username}</div>
                </div>
                
                <div className="mb-8">
                  <div className="text-[#f3c669] text-xs mb-1">Password</div>
                  <div className="text-white text-sm font-medium">{profileData.password}</div>
                </div>
                
                <button 
                  onClick={handleSignOut}
                  className="w-full bg-[#f3c669] text-black font-bold py-2.5 rounded-md hover:bg-[#e0b55c] transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
          
          <button 
            className="md:hidden text-white hover:text-[#f3c669] transition-colors ml-4"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu (Full Screen) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col bg-[#0a0a0a]">
          <div className="px-6 py-6 pb-12">
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight">PopFlix</span>
                <span className="text-xl">🍿</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <ul className="flex flex-col gap-6 text-2xl font-medium text-gray-400">
              <li className="text-[#f3c669] cursor-pointer" onClick={() => { setIsMobileMenuOpen(false); setSelectedMovie(null); }}>Home</li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>Categories</li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => { setIsMobileMenuOpen(false); onViewChange && onViewChange('mylist'); }}>My List</li>
            </ul>
          </div>
          
          {/* Bottom Section - Profile Details */}
          <div className="bg-[#333333] flex-1 px-8 py-10 flex flex-col items-center justify-end">
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-white/10 w-full max-w-[250px] shadow-xl">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-full bg-[#f3c669]/20 border border-[#f3c669] text-[#f3c669] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-[#f3c669] font-bold">MY PROFILE</div>
                </div>
              </div>
              <div className="mb-4">
                <span className="text-gray-400 text-xs uppercase tracking-wider block mb-1">Username</span>
                <span className="font-medium text-sm text-white">{profileData.username}</span>
              </div>
              <div className="mb-6">
                <span className="text-gray-400 text-xs uppercase tracking-wider block mb-1">Password</span>
                <span className="font-medium text-sm text-[#f3c669]">{profileData.password}</span>
              </div>
              <button 
                onClick={handleSignOut}
                className="w-full bg-[#f3c669] hover:bg-[#e0b55c] transition-colors text-black font-bold py-2 text-sm rounded-md flex items-center justify-center gap-2"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      {!selectedMovie ? (
        <section className="px-4 md:px-10 py-10 md:py-20 flex flex-col lg:flex-row justify-between items-center gap-10 border-b border-white/10 relative z-10">
          <div className="max-w-xl w-full">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Stream the<br />Best of Cinema
            </h1>
            <p className="text-[#f3c669] text-sm md:text-base leading-relaxed mb-8 md:mb-12 max-w-sm">
              Access a curated selection of top-rated movies, exclusive premieres, and hidden gems. Elevate your viewing experience with high-definition streaming and personalized recommendations.
            </p>
            
            <div className="flex flex-wrap items-center gap-6 md:gap-12">
              <div>
                <div className="text-2xl md:text-3xl font-bold mb-1">250+</div>
                <div className="text-[#f3c669] text-xs">Movies available</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold mb-1">450K+</div>
                <div className="text-[#f3c669] text-xs">People subscribed</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold mb-1">200K+</div>
                <div className="text-[#f3c669] text-xs">Top review</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-[300px] h-[450px] rounded-lg overflow-hidden relative shadow-2xl shadow-black/50">
              <img src={moviesData[currentHeroImageIndex].poster} alt="Hero Movie" className="w-full h-full object-cover transition-opacity duration-500" />
            </div>
            <div className="flex items-center gap-4 mt-6">
              <button onClick={handlePrevImage} className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:bg-white/10 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex gap-2">
                {moviesData.map((_, index) => (
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
      ) : (
        <section className="relative px-4 md:px-10 py-10 md:py-20 border-b border-white/10 min-h-[600px] flex items-center">
          {/* Backdrop */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img src={selectedMovie.backdrop || selectedMovie.poster} alt="" className="w-full h-full object-cover opacity-20 blur-sm scale-110" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50"></div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-16 w-full max-w-6xl mx-auto">
            {/* Poster */}
            <div className="w-full md:w-[350px] shrink-0">
              <div className="rounded-xl overflow-hidden shadow-2xl shadow-black/80 aspect-[2/3]">
                <img src={selectedMovie.poster} alt={selectedMovie.title} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col justify-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">{selectedMovie.title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300 font-medium mb-4">
                <span>{selectedMovie.year}</span>
                <span>|</span>
                <span>{selectedMovie.duration}</span>
                <span className="px-3 py-1 border border-white/30 rounded-md ml-2">{selectedMovie.genre}</span>
              </div>
              
              <div className="flex items-center gap-4 text-sm mb-8">
                <div className="flex text-[#f3c669] text-lg">
                  ★★★★<span className="text-gray-500">★</span>
                </div>
                <span className="font-bold">{selectedMovie.rating}/5.0</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-400">{selectedMovie.reviews} reviews by the Community</span>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">Overview</h3>
                <p className="text-gray-300 leading-relaxed max-w-2xl text-sm">
                  {selectedMovie.overview}
                </p>
              </div>
              
              <div className="space-y-1 text-sm mb-8">
                <p><span className="text-gray-400">Cast:</span> {selectedMovie.cast}</p>
                <p><span className="text-gray-400">Director:</span> {selectedMovie.director}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="bg-[#f3c669] hover:bg-[#e0b55c] transition-colors text-black font-bold px-6 py-2.5 rounded-md flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Play
                </button>
                <button 
                  onClick={() => {
                    const favs = JSON.parse(localStorage.getItem('myList') || '[]');
                    if (!favs.includes(selectedMovie.id)) {
                      favs.push(selectedMovie.id);
                      localStorage.setItem('myList', JSON.stringify(favs));
                      alert(`${selectedMovie.title} added to My List!`);
                    } else {
                      alert(`${selectedMovie.title} is already in My List.`);
                    }
                  }}
                  className="bg-transparent border border-white hover:bg-white/10 transition-colors text-white font-bold px-4 md:px-6 py-2.5 rounded-md flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="hidden sm:inline">Add to my list</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Movies Section (New Release or Other Movies) */}
      <section className="px-4 md:px-10 py-10 md:py-16 border-b border-white/10">
        <h2 className="text-2xl font-bold mb-10">
          {selectedMovie ? 'Other Movies' : 'New Release'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {otherMovies.map((movie) => (
            <div 
              key={movie.id}
              className="relative group rounded-lg overflow-hidden aspect-[2/3] cursor-pointer"
              onClick={() => handleMovieClick(movie)}
            >
              <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-lg font-bold mb-1">{movie.title}</h3>
                <div className="flex items-center text-sm">
                  <span className="text-[#f3c669] mr-1">★</span>
                  <span>{movie.rating}</span>
                  <span className="mx-2 text-gray-400">|</span>
                  <span className="text-gray-300">{movie.genre}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {displayCount < (selectedMovie ? moviesData.length - 1 : moviesData.length) && (
          <div className="flex justify-center">
            <button 
              onClick={() => setDisplayCount(prev => prev + 4)}
              className="bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors text-sm font-medium px-6 py-3 rounded-md flex items-center gap-2 text-gray-300 border border-white/5"
            >
              LOAD MORE MOVIES
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </section>

      {/* Top 3 Movies Section */}
      {!selectedMovie && (
        <section className="px-4 md:px-10 py-10 md:py-20 border-b border-white/10 overflow-hidden">
          <h2 className="text-2xl font-bold mb-10 md:mb-16">Top 3 Movies</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-16 md:gap-20">
            {[
              { num: '1', img: moviesData[0].poster },
              { num: '2', img: moviesData[1].poster },
              { num: '3', img: moviesData[2].poster },
            ].map((item) => (
              <div key={item.num} className="relative w-full max-w-[200px] aspect-[2/3]">
                <span 
                  className="absolute -left-6 md:-left-16 -top-8 text-[150px] md:text-[250px] font-bold text-transparent leading-none"
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
      )}

      {/* Footer / CTA Section */}
      <section className="px-4 md:px-10 py-10 md:py-20 flex flex-col md:flex-row items-center justify-between min-h-[300px] md:min-h-[400px] relative overflow-hidden">
        <div className="max-w-xl relative z-10 w-full text-center md:text-left pb-20 md:pb-0">
          <p className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight mb-6">
            From blockbuster hits to hidden gems, we've got a movie for every taste. Continue browsing to find your perfect match.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 md:top-0 w-full md:w-1/2 flex justify-center md:justify-end items-end md:items-center pointer-events-none opacity-50 md:opacity-100">
          <img 
            src="/popcorn_img.png" 
            alt="Popcorn" 
            className="w-[300px] md:w-[800px] object-contain md:translate-x-1/4 md:translate-y-10 md:scale-125"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 40%)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 40%)' }}
          />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
