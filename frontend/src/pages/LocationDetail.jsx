import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const LocationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(`/api/locations/${id}`);
        if (!response.ok) throw new Error('Location not found');
        const data = await response.json();
        setLocation(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
        <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-primary/20 dark:border-primary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <a className="flex items-center gap-2 text-[#10221b] dark:text-background-light" href="/">
                <span className="material-symbols-outlined text-primary text-3xl">explore</span>
                <span className="text-2xl font-bold">NomadNav</span>
              </a>
            </div>
          </div>
        </header>
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
          <p className="text-xl text-[#10221b]/80 dark:text-background-light/80">Loading location details...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
        <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-primary/20 dark:border-primary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <a className="flex items-center gap-2 text-[#10221b] dark:text-background-light" href="/">
                <span className="material-symbols-outlined text-primary text-3xl">explore</span>
                <span className="text-2xl font-bold">NomadNav</span>
              </a>
            </div>
          </div>
        </header>
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600 mb-4">Oops! {error}</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (!location) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display text-[#10221b] dark:text-background-light">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-primary/20 dark:border-primary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-8">
              <a className="flex items-center gap-2 text-[#10221b] dark:text-background-light" href="/">
                <span className="material-symbols-outlined text-primary text-3xl">explore</span>
                <span className="text-2xl font-bold">NomadNav</span>
              </a>
              <nav className="hidden md:flex items-center gap-6">
                <a className="text-sm font-medium hover:text-primary transition-colors" href="/">Explore</a>
                <a className="text-sm font-medium hover:text-primary transition-colors" href="/">Flights</a>
                <a className="text-sm font-medium hover:text-primary transition-colors" href="/">Hotels</a>
                <a className="text-sm font-medium hover:text-primary transition-colors" href="/">Trains</a>
                <a className="text-sm font-medium hover:text-primary transition-colors" href="/">Buses</a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Location Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">{location.name}</h1>
          <p className="text-lg text-[#10221b]/80 dark:text-background-light/80 mb-8">
            {location.description || `Discover the vibrant charm of ${location.name}, where culture and heritage come alive.`}
          </p>

          {/* Tabs */}
          <div className="border-b border-primary/20 dark:border-primary/30 mb-8">
            <nav aria-label="Tabs" className="-mb-px flex space-x-8">
              <a className="border-primary text-primary whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm" href="#overview">Overview</a>
              <a className="border-transparent text-[#10221b]/60 dark:text-background-light/60 hover:text-primary hover:border-primary/50 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm" href="#highlights">Highlights</a>
              <a className="border-transparent text-[#10221b]/60 dark:text-background-light/60 hover:text-primary hover:border-primary/50 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm" href="#map">Map</a>
              <a className="border-transparent text-[#10221b]/60 dark:text-background-light/60 hover:text-primary hover:border-primary/50 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm" href="#things">Things to Do</a>
            </nav>
          </div>

          {/* Quick Stats Section */}
          <section id="overview" className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-primary/10 dark:bg-primary/20 p-6 rounded-lg">
                <p className="text-sm font-medium text-[#10221b]/80 dark:text-background-light/80 mb-2">Rating</p>
                <p className="text-3xl font-bold text-primary">{location.average_rating?.toFixed(1) || 'N/A'}</p>
                <p className="text-sm text-[#10221b]/60 dark:text-background-light/60 mt-2">({location.total_reviews || 0} reviews)</p>
              </div>
              <div className="bg-primary/10 dark:bg-primary/20 p-6 rounded-lg">
                <p className="text-sm font-medium text-[#10221b]/80 dark:text-background-light/80 mb-2">Type</p>
                <p className="text-3xl font-bold text-primary">{location.type || 'N/A'}</p>
              </div>
              <div className="bg-primary/10 dark:bg-primary/20 p-6 rounded-lg">
                <p className="text-sm font-medium text-[#10221b]/80 dark:text-background-light/80 mb-2">Popularity Score</p>
                <p className="text-3xl font-bold text-primary">{location.popularity_score || 0}/100</p>
              </div>
            </div>
          </section>

          {/* Location Details */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">info</span>
              Location Details
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg">
                <p className="text-sm font-medium text-[#10221b]/80 dark:text-background-light/80">City</p>
                <p className="text-lg font-bold mt-2">{location.city_name || 'N/A'}</p>
              </div>
              <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg">
                <p className="text-sm font-medium text-[#10221b]/80 dark:text-background-light/80">State</p>
                <p className="text-lg font-bold mt-2">{location.state_name || 'N/A'}</p>
              </div>
              <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg">
                <p className="text-sm font-medium text-[#10221b]/80 dark:text-background-light/80">Country</p>
                <p className="text-lg font-bold mt-2">{location.country_name || 'N/A'}</p>
              </div>
              <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg">
                <p className="text-sm font-medium text-[#10221b]/80 dark:text-background-light/80">ID</p>
                <p className="text-lg font-bold mt-2">{location.id}</p>
              </div>
            </div>
          </section>

          {/* Highlights Section */}
          <section id="highlights" className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">star</span>
              {location.name} Highlights
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="group">
                <div className="overflow-hidden rounded-lg mb-2">
                  <div 
                    className="w-full h-40 bg-cover bg-center rounded-lg transform group-hover:scale-105 transition-transform duration-300" 
                    style={{ backgroundImage: `url('${location.image_url}')` }} 
                  />
                </div>
                <h3 className="text-base font-semibold">{location.name} Main Attraction</h3>
              </div>
              <div className="group opacity-50">
                <div className="overflow-hidden rounded-lg mb-2">
                  <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">add_a_photo</span>
                  </div>
                </div>
                <h3 className="text-base font-semibold text-[#10221b]/60 dark:text-background-light/60">More images coming soon</h3>
              </div>
              <div className="group opacity-50">
                <div className="overflow-hidden rounded-lg mb-2">
                  <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">add_a_photo</span>
                  </div>
                </div>
                <h3 className="text-base font-semibold text-[#10221b]/60 dark:text-background-light/60">More images coming soon</h3>
              </div>
              <div className="group opacity-50">
                <div className="overflow-hidden rounded-lg mb-2">
                  <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">add_a_photo</span>
                  </div>
                </div>
                <h3 className="text-base font-semibold text-[#10221b]/60 dark:text-background-light/60">More images coming soon</h3>
              </div>
            </div>
          </section>

          {/* Map Section */}
          <section id="map" className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">map</span>
              {location.name} Map
            </h2>
            <div className="w-full aspect-video rounded-xl bg-cover bg-center bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              <div className="text-center">
                <span className="material-symbols-outlined text-5xl text-primary mb-2 block">place</span>
                <p className="text-[#10221b]/80 dark:text-background-light/80">Latitude: {location.latitude?.toFixed(4)}</p>
                <p className="text-[#10221b]/80 dark:text-background-light/80">Longitude: {location.longitude?.toFixed(4)}</p>
              </div>
            </div>
          </section>

          {/* How to Reach Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">directions_bus</span>
              How to Reach
            </h2>
            <p className="text-base leading-relaxed text-[#10221b]/80 dark:text-background-light/80">
              {location.name} is well-connected by air, rail, and road. Major transportation hubs provide easy access. 
              Plan your journey in advance and use local transportation options to explore the area. Visit nearby landmarks 
              and attractions for a complete experience of this beautiful destination.
            </p>
          </section>

          {/* Things to Do Section */}
          <section id="things" className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">attractions</span>
              Things to Do
            </h2>
            <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4">
              <div className="flex-shrink-0 w-64 group">
                <div className="overflow-hidden rounded-lg mb-2">
                  <div 
                    className="w-full h-40 bg-cover bg-center rounded-lg transform group-hover:scale-105 transition-transform duration-300" 
                    style={{ backgroundImage: `url('${location.image_url}')` }} 
                  />
                </div>
                <h3 className="text-base font-semibold">Explore {location.name}</h3>
              </div>
              <div className="flex-shrink-0 w-64 group opacity-50">
                <div className="overflow-hidden rounded-lg mb-2">
                  <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">add_a_photo</span>
                  </div>
                </div>
                <h3 className="text-base font-semibold text-[#10221b]/60 dark:text-background-light/60">More attractions coming</h3>
              </div>
              <div className="flex-shrink-0 w-64 group opacity-50">
                <div className="overflow-hidden rounded-lg mb-2">
                  <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">add_a_photo</span>
                  </div>
                </div>
                <h3 className="text-base font-semibold text-[#10221b]/60 dark:text-background-light/60">More attractions coming</h3>
              </div>
              <div className="flex-shrink-0 w-64 group opacity-50">
                <div className="overflow-hidden rounded-lg mb-2">
                  <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">add_a_photo</span>
                  </div>
                </div>
                <h3 className="text-base font-semibold text-[#10221b]/60 dark:text-background-light/60">More attractions coming</h3>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <section className="mb-12">
            <div className="flex gap-4">
              <button className="flex-1 bg-primary text-background-light font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">favorite</span>
                Save to Favorites
              </button>
              <button className="flex-1 bg-primary/10 dark:bg-primary/20 text-primary font-bold py-3 rounded-lg hover:bg-primary/20 transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">share</span>
                Share
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LocationDetail;
