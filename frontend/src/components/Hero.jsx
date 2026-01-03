// src/components/Hero.jsx
import React, { useState, useCallback, useRef, useEffect } from 'react';
import debounce from 'lodash/debounce';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchInputRef = useRef(null);
  const resultsContainerRef = useRef(null);

  // API Call to backend
  const fetchLocationSuggestions = async (query) => {
    if (query.length < 3) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/locations/search?q=${encodeURIComponent(query)}&limit=5`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }

      const data = await response.json();
      setResults(data.results || []);
      setShowResults(true);
      setSelectedIndex(-1);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search (wait 300ms after user stops typing)
  const debouncedSearch = useCallback(
    debounce((query) => {
      fetchLocationSuggestions(query);
    }, 300),
    []
  );

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showResults || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelectLocation(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowResults(false);
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  };

  // Handle location selection
  const handleSelectLocation = (location) => {
    setSearchQuery(location.name);
    setShowResults(false);
    setResults([]);
    
    // Navigate to location detail page
    window.location.href = `/location/${location.id}`;
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        resultsContainerRef.current &&
        !resultsContainerRef.current.contains(event.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle search form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim().length >= 3) {
      // Redirect to search results page
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="relative min-h-[60vh] flex items-center justify-center text-white">
      <video autoPlay className="absolute inset-0 w-full h-full object-cover" loop muted playsInline>
        <source src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs1AeK79zbrPan4MG7GCdxSbRFclAzPPTcaIA6ioHCEmK5L0mh-kQqePrsKsppRxvLG7n5IyPY0BKDqPZ-IYd-ThejK8ZBVvqJK40f2N_rOVyc64TDa7SJHXzlYdx5GFhprA0P6SrOK1Phfo_JAiaaLeFKYUIoY8QNB0UCB_7xP4xtLzNYquGtsa9UfWhMljGD24f7sUGC7zeT30JzJ27gD71MNp7gndwzTKvvHy4JmoEbMj5Gr9oYp8ir0peTaiurMFhnCLQf5yg" type="video/mp4"/>
      </video>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 flex flex-col items-center gap-6 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Explore the Soul of India</h1>
        <p className="max-w-2xl text-lg md:text-xl font-light">Discover the diverse landscapes, rich cultures, and timeless traditions of India. Your journey begins here.</p>
        <div className="w-full max-w-2xl mt-4 relative">
          <form className="flex items-center bg-white rounded-2xl shadow-lg overflow-hidden" onSubmit={handleSubmit}>
            <span className="material-symbols-outlined text-gray-500 pl-4">search</span>
            <input 
              ref={searchInputRef}
              className="form-input w-full flex-1 border-0 focus:ring-0 text-gray-800 placeholder:text-gray-500 py-4 px-4" 
              placeholder="Where to? e.g., 'Kerala backwaters' or 'Himalayan peaks'"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => searchQuery.length >= 3 && setShowResults(true)}
              aria-label="Search locations"
              aria-autocomplete="list"
              aria-expanded={showResults}
            />
            {isLoading && <span className="pr-4">⏳</span>}
            <button 
              type="submit"
              className="bg-primary text-white font-bold py-4 px-8 self-stretch hover:bg-primary/90 transition-colors"
            >
              Search
            </button>
          </form>

          {/* Typeahead Dropdown - Using Tailwind CSS */}
          {showResults && results.length > 0 && (
            <div
              ref={resultsContainerRef}
              className="absolute top-full left-0 right-0 bg-white text-gray-800 rounded-b-2xl shadow-lg max-h-96 overflow-y-auto z-50 mt-1"
              role="listbox"
            >
              {results.map((location, index) => (
                <div
                  key={location.id}
                  className={`px-4 py-3 border-b border-gray-100 cursor-pointer transition-colors ${
                    index === selectedIndex ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleSelectLocation(location)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  role="option"
                  aria-selected={index === selectedIndex}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-gray-900">{location.name}</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {location.type}
                    </span>
                  </div>
                  
                  <div className="flex gap-2 text-sm text-gray-600">
                    <span>{location.city_name}</span>
                    <span>•</span>
                    <span>{location.state_name}</span>
                    <span className="ml-auto text-amber-600 font-medium">
                      ⭐ {location.average_rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results Message */}
          {showResults && searchQuery.length >= 3 && results.length === 0 && !isLoading && (
            <div className="absolute top-full left-0 right-0 bg-white text-gray-800 rounded-b-2xl shadow-lg p-4 text-center text-gray-500 z-50 mt-1">
              No locations found for "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
