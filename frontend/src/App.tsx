// frontend/src/App.tsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/HeroSection/HeroSection';
import RecommendationsWidget from './components/RecommendationsWidget/RecommendationsWidget';
import EnvironmentalDashboard from './components/EnvironmentalDashboard/EnvironmentalDashboard';
import MilestoneCard from './components/MilestoneCard/MilestoneCard';
import MapRoutePlanner from './components/MapRoutePlanner/MapRoutePlanner';
import './App.css';

function HomePage() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearch = (results: any[]) => {
    setSearchResults(results);
    setShowSearchResults(true);
  };

  const handlePlanTrip = () => {
    console.log('Plan trip clicked');
    // Navigate to trip planner
  };

  const handleExploreEnvironment = () => {
    console.log('Explore environment clicked');
    // Navigate to environmental insights
  };

  return (
    <>
      <HeroSection 
        onSearch={handleSearch}
        onPlanTrip={handlePlanTrip}
        onExploreEnvironment={handleExploreEnvironment}
      />
      
      <main className="main-content">
        {showSearchResults ? (
          <section className="search-results">
            <h2>Search Results</h2>
            <div className="results-grid">
              {searchResults.map((item) => (
                <div key={item.id} className="result-card">
                  <img src={item.image} alt={item.name} />
                  <div className="result-content">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <>
            <section className="recommendations-section">
              <RecommendationsWidget userId="demo-user" />
            </section>
            
            <section className="environmental-section">
              <EnvironmentalDashboard location="jaipur" />
            </section>
            
            <section className="gamification-section">
              <h2>Your Travel Achievements</h2>
              <MilestoneCard userId="demo-user" />
            </section>
          </>
        )}
      </main>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/plan-trip" element={
              <div className="main-content">
                <MapRoutePlanner />
              </div>
            } />
            <Route path="/explore" element={
              <div className="main-content">
                <h1>Explore Jaipur</h1>
                <p>Discover all the amazing places in Jaipur</p>
              </div>
            } />
            <Route path="/environmental" element={
              <div className="main-content">
                <EnvironmentalDashboard location="jaipur" />
              </div>
            } />
            <Route path="/about" element={
              <div className="main-content">
                <h1>About ExploreJaipur</h1>
                <p>Learn more about our mission to make tourism in Jaipur sustainable and enjoyable</p>
              </div>
            } />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;