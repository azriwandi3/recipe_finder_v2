import React, { useState, useRef, useEffect } from 'react';
import { Search, Clock, Sparkles } from 'lucide-react';
import { getSearchSuggestions, getSearchHistory, addToSearchHistory } from '../utils/history';

export default function SearchInput({ onSearch, className = '' }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSuggestions(getSearchSuggestions(value));
    setShowSuggestions(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      addToSearchHistory(searchQuery.trim());
      onSearch(searchQuery);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    addToSearchHistory(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className={`relative ${className}`} ref={suggestionsRef}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search recipes..."
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </form>

      {showSuggestions && (searchQuery || getSearchHistory().length > 0) && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          {searchQuery && suggestions.length > 0 && (
            <div className="p-2">
              <div className="flex items-center px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                <Sparkles className="h-4 w-4 mr-2" />
                <span>Suggestions</span>
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={`suggestion-${index}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {getSearchHistory().length > 0 && (
            <div className="p-2 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                <Clock className="h-4 w-4 mr-2" />
                <span>Recent Searches</span>
              </div>
              {getSearchHistory().slice(0, 5).map((query, index) => (
                <button
                  key={`history-${index}`}
                  onClick={() => handleSuggestionClick(query)}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded"
                >
                  {query}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}