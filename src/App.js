import React, { useEffect, useState } from 'react';
import { FaMoon, FaSun, FaChevronDown } from 'react-icons/fa';
import './index.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [movies, setMovies] = useState([]);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=938c5aa757bcf6964e5fcede15b6cb97&language=en-US&page=1`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (err) {
        console.error('Failed to fetch movies:', err);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition duration-300">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <a href="#">
          <h1 className="text-xl font-bold">🎬 MovieSite</h1>
        </a>

        {/* NAV */}
        <nav className="flex gap-6 text-sm relative">
          <Dropdown title="Movies">
            <a href="#" className="dropdown-link">Top Rated</a>
            <a href="#" className="dropdown-link">Upcoming</a>
            <a href="#" className="dropdown-link">Trending</a>
          </Dropdown>

          <Dropdown title="Shows">
            <a href="#" className="dropdown-link">Popular Shows</a>
            <a href="#" className="dropdown-link">Airing Today</a>
          </Dropdown>

          <Dropdown title="Contact">
            <a href="#" className="dropdown-link">Email</a>
            <a href="#" className="dropdown-link">Support</a>
          </Dropdown>
        </nav>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="text-xl hover:scale-110 transition-transform"
          aria-label="Toggle theme"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </header>

      {/* Content */}
      <main className="px-6 py-10 text-center">
        <h2 className="text-3xl font-bold mb-2">Watch Movies. Anytime. Anywhere.</h2>
        <p className="mb-8 text-sm text-gray-600 dark:text-gray-400">
          Stream the best movies online for free or premium experience
        </p>

        {/* Movie Grid */}
        <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white dark:bg-gray-800 p-3 rounded shadow hover:shadow-lg transition-all"
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto rounded mb-2"
              />
              <h3 className="font-semibold text-xl truncate mb-2">{movie.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">{movie.release_date}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// Dropdown Component
const Dropdown = ({ title, children }) => {
  return (
    <div className="group relative">
      <button className="flex items-center gap-1  focus:outline-none">
        {title} <FaChevronDown className="text-xs mt-0.5 transition-transform group-hover:rotate-180" />
      </button>
      <div className="absolute left-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-10">
        <div className="flex flex-col text-left p-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default App;
