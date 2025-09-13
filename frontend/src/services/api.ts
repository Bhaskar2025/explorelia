const API_BASE_URL = 'http://localhost:5000/api';

export interface Attraction {
  id: number;
  name: string;
  type: string;
  description: string;
  rating: number;
  price_range: string;
  image: string;
  coordinates: [number, number];
  tags: string[];
}

export interface EnvironmentalData {
  current_aqi: number;
  aqi_category: string;
  current_temperature: number;
  weather_condition: string;
  humidity: number;
  wind_speed: number;
  heatmap_image: string;
  aqi_trend: Record<string, { aqi: number; timestamp: string }>;
}

export interface RouteData {
  polyline: [number, number][];
  total_distance: number;
  total_time: number;
  aqi_exposure: number;
}

export interface MilestoneData {
  current_milestone: string;
  description: string;
  progress: number;
  next_milestone: string;
  badges: { name: string; earned: boolean }[];
}

// Fetch recommendations
export const getRecommendations = async (userId: string = 'default'): Promise<Attraction[]> => {
  const response = await fetch(`${API_BASE_URL}/recommendations?userId=${userId}`);
  if (!response.ok) throw new Error('Failed to fetch recommendations');
  return response.json();
};

// Search attractions
export const searchAttractions = async (query: string): Promise<Attraction[]> => {
  const response = await fetch(`${API_BASE_URL}/recommendations/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Failed to search attractions');
  return response.json();
};

// Fetch environmental data
export const getEnvironmentalData = async (location: string = 'jaipur'): Promise<EnvironmentalData> => {
  const response = await fetch(`${API_BASE_URL}/environmental?location=${location}`);
  if (!response.ok) throw new Error('Failed to fetch environmental data');
  return response.json();
};

// Calculate route
export const calculateRoute = async (
  origin: string, 
  destination: string, 
  preference: string = 'fastest'
): Promise<RouteData> => {
  const response = await fetch(`${API_BASE_URL}/route`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ origin, destination, preference }),
  });
  if (!response.ok) throw new Error('Failed to calculate route');
  return response.json();
};

// Fetch user milestones
export const getUserMilestones = async (userId: string): Promise<MilestoneData> => {
  const response = await fetch(`${API_BASE_URL}/user/${userId}/milestones`);
  if (!response.ok) throw new Error('Failed to fetch user milestones');
  return response.json();
};