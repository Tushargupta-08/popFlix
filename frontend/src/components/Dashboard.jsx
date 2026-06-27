import React, { useState, useEffect } from 'react';

export const moviesData = [
  {
    id: 1,
    title: 'Omni Loop',
    poster: '/movie_one.png',
    backdrop: '/movie_one.png',
    year: '2024',
    duration: '1h 47m',
    genre: 'Sci-Fi',
    rating: '4.8',
    reviews: '150',
    overview: 'A quantum physicist finds herself stuck in a time loop with a black hole growing in her chest and only a week to live. When she meets a gifted student they team up to save her life and unlock the mysteries of time travel.',
    cast: 'Chris Witaske, Ayo Edebiri',
    director: 'Bernardo Britto'
  },
  {
    id: 2,
    title: 'Strange Darling',
    poster: '/movie_two.png',
    backdrop: '/movie_two.png',
    year: '2024',
    duration: '1h 36m',
    genre: 'Thriller',
    rating: '5.0',
    reviews: '320',
    overview: 'A clever and relentless thriller about a twisted one-night stand that escalates into a brutal serial killer\'s murder spree.',
    cast: 'Willa Fitzgerald, Kyle Gallner',
    director: 'JT Mollner'
  },
  {
    id: 3,
    title: 'Cuckoo',
    poster: '/movie_three.png',
    backdrop: '/movie_three.png',
    year: '2024',
    duration: '1h 42m',
    genre: 'Horror',
    rating: '3.8',
    reviews: '89',
    overview: 'A 17-year-old girl is forced to move with her family to a resort where things are not what they seem.',
    cast: 'Hunter Schafer, Dan Stevens',
    director: 'Tilman Singer'
  },
  {
    id: 4,
    title: 'Snow White',
    poster: '/hero_poster.png', // Using the cinematic poster we generated earlier
    backdrop: '/hero_poster.png',
    year: '2024',
    duration: '2h 10m',
    genre: 'Fantasy',
    rating: '5.0',
    reviews: '500',
    overview: 'A magical journey into an enchanted forest where a young princess must uncover her true destiny.',
    cast: 'Rachel Zegler, Gal Gadot',
    director: 'Marc Webb'
  }
];

const Dashboard = ({ onViewChange }) => {
  const [currentHeroImageIndex, setCurrentHeroImageIndex] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileData, setProfileData] = useState({ username: 'Loading...', password: 'Loading...' });

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const otherMovies = selectedMovie 
    ? moviesData.filter(m => m.id !== selectedMovie.id) 
    : moviesData.slice(0, 3);

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-6 border-b border-white/10 relative z-20 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSelectedMovie(null)}>
            <span className="text-2xl font-bold tracking-tight">PopFlix</span>
            <span className="text-2xl">🍿</span>
          </div>
          <ul className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <li className="text-[#f3c669] font-medium cursor-pointer" onClick={() => setSelectedMovie(null)}>Home</li>
            <li className="hover:text-white transition-colors cursor-pointer">Categories</li>
            <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onViewChange && onViewChange('mylist')}>My List</li>
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
        </div>
      </nav>

      {/* Hero Section */}
      {!selectedMovie ? (
        <section className="px-10 py-20 flex flex-col lg:flex-row justify-between items-center gap-10 border-b border-white/10 relative z-10">
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
        <section className="relative px-10 pt-20 pb-24 border-b border-white/10 flex justify-center">
          {/* Blurred Background Image */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-[#0a0a0a]/70 z-10 backdrop-blur-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-[#0a0a0a]/80 z-10"></div>
            <img src={selectedMovie.backdrop} alt="Backdrop" className="w-full h-[150%] object-cover object-center opacity-60 -translate-y-20 scale-110" />
          </div>

          <div className="relative z-20 flex flex-col md:flex-row gap-12 max-w-5xl w-full items-center md:items-start">
            <div className="shrink-0">
              <img src={selectedMovie.poster} alt={selectedMovie.title} className="w-[300px] h-[450px] object-cover rounded-lg shadow-2xl" />
            </div>
            
            <div className="flex flex-col justify-center mt-4">
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300 font-medium mb-4">
                <span>{selectedMovie.year}</span>
                <span>|</span>
                <span>{selectedMovie.duration}</span>
                <span className="px-3 py-1 border border-white/30 rounded-md ml-2">{selectedMovie.genre}</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">{selectedMovie.title}</h1>
              
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
                <button className="bg-[#f3c669] hover:bg-[#e0b55c] transition-colors text-black font-bold px-8 py-2.5 rounded-md flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
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
                  className="bg-transparent border border-white hover:bg-white/10 transition-colors text-white font-bold px-6 py-2.5 rounded-md flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add to my list
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Movies Section (New Release or Other Movies) */}
      <section className="px-10 py-16 border-b border-white/10 relative z-20 bg-[#0a0a0a]">
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
        
        {!selectedMovie && (
          <div className="flex justify-center">
            <button className="bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors text-sm font-medium px-6 py-3 rounded-md flex items-center gap-2 text-gray-300 border border-white/5">
              LOAD MORE MOVIES
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </section>

      {/* Top 3 Movies Section - Only show when no movie is selected */}
      {!selectedMovie && (
        <section className="px-10 py-20 border-b border-white/10 relative z-20 bg-[#0a0a0a]">
          <h2 className="text-2xl font-bold mb-16">Top 3 Movies</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-20">
            {[
              { num: '1', img: moviesData[0].poster },
              { num: '2', img: moviesData[1].poster },
              { num: '3', img: moviesData[2].poster },
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
      )}

      {/* Footer / CTA Section */}
      <section className="px-10 py-20 flex flex-col md:flex-row items-center justify-between min-h-[400px] relative overflow-hidden bg-[#0a0a0a]">
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

export default Dashboard;
