// frontend/src/components/HeroSection/HeroSection.tsx
import React, { useState } from 'react';
import { searchAttractions } from '../../services/api';
import './HeroSection.css';

interface HeroSectionProps {
  onSearch: (results: any[]) => void;
  onPlanTrip: () => void;
  onExploreEnvironment: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  onSearch, 
  onPlanTrip, 
  onExploreEnvironment 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const results = await searchAttractions(searchQuery);
      onSearch(results);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length > 2) {
      try {
        const results = await searchAttractions(value);
        setSuggestions(results.slice(0, 5));
        setShowSuggestions(true);
      } catch (error) {
        console.error('Suggestion error:', error);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion: any) => {
    setSearchQuery(suggestion.name);
    setShowSuggestions(false);
    onSearch([suggestion]);
  };

  return (
    <section className="hero-section">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Discover the Pink City</h1>
          <p>AI-powered personalized tourism with real-time environmental insights</p>
          
          <form onSubmit={handleSearch} className="search-bar">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search attractions, hotels, restaurants..."
                value={searchQuery}
                onChange={handleInputChange}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onFocus={() => searchQuery.length > 2 && setShowSuggestions(true)}
              />
              <button type="submit" aria-label="Search">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              {showSuggestions && suggestions.length > 0 && (
                <div className="suggestions-dropdown">
                  {suggestions.map((item) => (
                    <div 
                      key={item.id} 
                      className="suggestion-item"
                      onMouseDown={() => selectSuggestion(item)}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>
          
          <div className="cta-buttons">
            <button onClick={onPlanTrip} className="cta-button primary">
              Plan My Smart Trip
            </button>
            <button onClick={onExploreEnvironment} className="cta-button secondary">
              Explore Environmental Insights
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;