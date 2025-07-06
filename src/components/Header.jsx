import React from 'react';
import { ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchInput from './SearchInput';

export default function Header({ onSearch }) {
  const [isDark, setIsDark] = React.useState(
    document.documentElement.classList.contains('dark')
  );

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <ChefHat className="h-10 w-10 text-green-600 dark:text-green-400" />
            <span className="text-4xl font-bold text-gray-800 dark:text-white font-akronim">Recipe Azry</span>
          </Link>

          <SearchInput onSearch={onSearch} className="flex-1 max-w-xl mx-4" />

          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400">Home</Link>
              <Link to="/about" className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400">About</Link>
              <Link to="/contact" className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400">Contact</Link>
              <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="sr-only">Toggle dark mode</span>
              {isDark ? '🌞' : '🌙'}
            </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}