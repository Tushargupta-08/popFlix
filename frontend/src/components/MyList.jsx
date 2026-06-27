import React, { useState, useEffect } from 'react';
import { moviesData } from './Dashboard';

const MyList = ({ onViewChange }) => {
  const [myMovies, setMyMovies] = useState([]);
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

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('myList') || '[]');
    const filtered = moviesData.filter(m => favs.includes(m.id));
    setMyMovies(filtered);
  }, []);

  const removeFromList = (id) => {
    const favs = JSON.parse(localStorage.getItem('myList') || '[]');
    const updatedFavs = favs.filter(favId => favId !== id);
    localStorage.setItem('myList', JSON.stringify(updatedFavs));
    setMyMovies(moviesData.filter(m => updatedFavs.includes(m.id)));
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-6 border-b border-white/10 relative z-20 bg-[#0a0a0a]">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onViewChange && onViewChange('dashboard')}>
            <span className="text-2xl font-bold tracking-tight">PopFlix</span>
            <span className="text-2xl">🍿</span>
          </div>
          <ul className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onViewChange && onViewChange('dashboard')}>Home</li>
            <li className="hover:text-white transition-colors cursor-pointer">Categories</li>
            <li className="text-[#f3c669] font-medium cursor-pointer">My List</li>
          </ul>
        </div>
        
        {/* Profile icon */}
        <div className="flex items-center gap-6">
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

      {/* My List Content */}
      <section className="px-10 py-16">
        <h2 className="text-3xl font-bold mb-10">My List</h2>
        
        {myMovies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <p className="text-lg">Your list is empty.</p>
            <p className="text-sm mt-2">Explore movies and add them to your list!</p>
            <button 
              onClick={() => onViewChange && onViewChange('dashboard')}
              className="mt-6 bg-[#f3c669] text-black font-medium px-6 py-2 rounded-md hover:bg-[#e0b55c] transition-colors"
            >
              Browse Movies
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {myMovies.map((movie) => (
              <div key={movie.id} className="relative group rounded-lg overflow-hidden aspect-[2/3]">
                <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                
                {/* Remove Button */}
                <button 
                  onClick={() => removeFromList(movie.id)}
                  className="absolute top-4 right-4 bg-black/60 hover:bg-red-600/80 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all text-white"
                  title="Remove from My List"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-lg font-bold mb-1 truncate">{movie.title}</h3>
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
        )}
      </section>
    </div>
  );
};

export default MyList;
