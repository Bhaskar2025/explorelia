import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MapComponent from '../components/MapComponent';

const LocationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [envData, setEnvData] = useState(null);
  const [envLoading, setEnvLoading] = useState(true);
  const [envError, setEnvError] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(`/api/locations/${id}`);
        if (!response.ok) throw new Error('Location not found');
        const data = await response.json();
        setData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, [id]);

  useEffect(() => {
    if (data?.location?.city_name) {
      const fetchEnvironmentalData = async () => {
        try {
          const response = await axios.get(`/api/environmental?location=${data.location.city_name}`);
          setEnvData(response.data);
        } catch (err) {
          setEnvError(err.message);
        } finally {
          setEnvLoading(false);
        }
      };
      fetchEnvironmentalData();
    }
  }, [data?.location?.city_name]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
        <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-primary/20 dark:border-primary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <a className="flex items-center gap-2 text-[#10221b] dark:text-background-light" href="/">
                <span className="material-symbols-outlined text-primary text-3xl">explore</span>
                <span className="text-2xl font-bold">Explorelia</span>
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
                <span className="text-2xl font-bold">Explorelia</span>
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

  if (!data) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display text-[#10221b] dark:text-background-light">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-primary/20 dark:border-primary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-8">
              <a className="flex items-center gap-2 text-[#10221b] dark:text-background-light" href="/">
                <span className="material-symbols-outlined text-primary text-3xl">explore</span>
                <span className="text-2xl font-bold">Explorelia</span>
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
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Discover {data.location.name}</h1>
            <p className="text-lg text-[#10221b]/80 dark:text-background-light/80 mb-8">
              {data.location.description || `Discover the vibrant charm of ${data.location.name}, where culture and heritage come alive.`}
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
                <p className="text-3xl font-bold text-primary">{data.location.average_rating?.toFixed(1) || 'N/A'}</p>
                <p className="text-sm text-[#10221b]/60 dark:text-background-light/60 mt-2">({data.location.total_reviews || 0} reviews)</p>
              </div>
              <div className="bg-primary/10 dark:bg-primary/20 p-6 rounded-lg">
                <p className="text-sm font-medium text-[#10221b]/80 dark:text-background-light/80 mb-2">Type</p>
                <p className="text-3xl font-bold text-primary">{data.location.type || 'N/A'}</p>
              </div>
              <div className="bg-primary/10 dark:bg-primary/20 p-6 rounded-lg">
                <p className="text-sm font-medium text-[#10221b]/80 dark:text-background-light/80 mb-2">Popularity Score</p>
                <p className="text-3xl font-bold text-primary">{data.location.popularity_score || 0}/100</p>
              </div>
            </div>
          </section>

          <section class="mb-12">
            <h2 class="text-2xl font-bold mb-6 flex items-center gap-3"><span class="material-symbols-outlined text-primary">partly_cloudy_day</span>Weather & AQI</h2>
            {envLoading ? (
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-primary/10 dark:bg-primary/20 p-6 rounded-lg flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-[#10221b]/80 dark:text-background-light/80">Temperature</p>
                    <p class="text-3xl font-bold">—</p>
                  </div>
                  <span class="material-symbols-outlined text-4xl text-primary">thermostat</span>
                </div>
                <div class="bg-primary/10 dark:bg-primary/20 p-6 rounded-lg flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-[#10221b]/80 dark:text-background-light/80">Air Quality Index (AQI)</p>
                    <p class="text-3xl font-bold">—</p>
                  </div>
                  <span class="material-symbols-outlined text-4xl text-primary">air</span>
                </div>
              </div>
            ) : envError ? (
              <div class="text-center py-8">
                <p class="text-red-600">Error loading environmental data: {envError}</p>
              </div>
            ) : (
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-primary/10 dark:bg-primary/20 p-6 rounded-lg flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-[#10221b]/80 dark:text-background-light/80">Temperature</p>
                    <p class="text-3xl font-bold">{envData?.tempC}°C</p>
                  </div>
                  <span class="material-symbols-outlined text-4xl text-primary">thermostat</span>
                </div>
                <div class="bg-primary/10 dark:bg-primary/20 p-6 rounded-lg flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-[#10221b]/80 dark:text-background-light/80">Air Quality Index (AQI)</p>
                    <p class="text-3xl font-bold">{envData?.aqi}</p>
                  </div>
                  <span class="material-symbols-outlined text-4xl text-primary">air</span>
                </div>
              </div>
            )}
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
                <p className="text-lg font-bold mt-2">{data.location.city_name || 'N/A'}</p>
              </div>
              <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg">
                <p className="text-sm font-medium text-[#10221b]/80 dark:text-background-light/80">State</p>
                <p className="text-lg font-bold mt-2">{data.location.state_name || 'N/A'}</p>
              </div>
              <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg">
                <p className="text-sm font-medium text-[#10221b]/80 dark:text-background-light/80">Country</p>
                <p className="text-lg font-bold mt-2">{data.location.country_name || 'N/A'}</p>
              </div>
              <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg">
                <p className="text-sm font-medium text-[#10221b]/80 dark:text-background-light/80">ID</p>
                <p className="text-lg font-bold mt-2">{data.location.id}</p>
              </div>
            </div>
          </section>

          {/* Highlights Section */}
          <section id="highlights" className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">star</span>
              {data.location.name} Highlights
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Main location image */}
              <div className="group">
                <div className="overflow-hidden rounded-lg mb-2">
                  <div
                    className="w-full h-40 bg-cover bg-center rounded-lg transform group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url('${data.location.image_url}')` }}
                  />
                </div>
                <h3 className="text-base font-semibold">{data.location.name} Main Attraction</h3>
              </div>
              {/* Related attractions */}
              {data.related_attractions?.map((attr) => (
                <Link key={attr.id} to={`/location/${attr.id}`} className="group">
                  <div className="overflow-hidden rounded-lg mb-2">
                    <div
                      className="w-full h-40 bg-cover bg-center rounded-lg transform group-hover:scale-105 transition-transform duration-300"
                      style={{ backgroundImage: `url('${attr.image_url}')` }}
                    />
                  </div>
                  <h3 className="text-base font-semibold">{attr.name}</h3>
                </Link>
              ))}
            </div>
          </section>

          {/* Map Section */}
          <section id="map" className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">map</span>
              {data.location.name} Map
            </h2>
            <div className="w-full aspect-video">
              <MapComponent 
                latitude={data.location.latitude}
                longitude={data.location.longitude}
                locationName={data.location.name}
              />
            </div>
          </section>

          {/* How to Reach Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">directions_bus</span>
              How to Reach
            </h2>
              <p className="text-base leading-relaxed text-[#10221b]/80 dark:text-background-light/80">
              {data.location.name} is well-connected by air, rail, and road. Major transportation hubs provide easy access. 
              Plan your journey in advance and use local transportation options to explore the area. Visit nearby landmarks 
              and attractions for a complete experience of this beautiful destination.
            </p>
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
