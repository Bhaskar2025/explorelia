from models.location import Location
from extensions import db
import math

class LocationRepository:
    """
    Data access layer for Location
    
    Similar to Spring's @Repository
    Handles all database queries for locations
    """
    
    @staticmethod
    def get_by_id(location_id):
        """Get location by ID"""
        return Location.query.filter(
            Location.id == location_id,
            Location.is_active == True
        ).first()
    
    @staticmethod
    def search_by_name(query, limit=5):
        """
        Search locations by name
        Returns locations sorted by popularity and rating
        """
        return Location.query.filter(
            Location.is_active == True,
            Location.name.ilike(f'%{query}%')
        ).order_by(
            Location.popularity_score.desc(),
            Location.average_rating.desc()
        ).limit(limit).all()
    
    @staticmethod
    def get_attractions_by_state(state_name, limit=10):
        """Get attractions in a specific state"""
        return Location.query.filter(
            Location.state_name == state_name,
            Location.type == 'ATTRACTION',
            Location.is_active == True
        ).order_by(
            Location.popularity_score.desc(),
            Location.average_rating.desc()
        ).limit(limit).all()
    
    @staticmethod
    def get_attractions_by_city(city_name, state_name, limit=10):
        """Get attractions in a specific city"""
        return Location.query.filter(
            Location.city_name == city_name,
            Location.state_name == state_name,
            Location.type == 'ATTRACTION',
            Location.is_active == True
        ).order_by(
            Location.popularity_score.desc(),
            Location.average_rating.desc()
        ).limit(limit).all()
    
    @staticmethod
    def get_other_attractions_in_city(city_name, state_name, exclude_id, limit=10):
        """Get other attractions in the same city (excluding given ID)"""
        return Location.query.filter(
            Location.city_name == city_name,
            Location.state_name == state_name,
            Location.type == 'ATTRACTION',
            Location.id != exclude_id,
            Location.is_active == True
        ).order_by(
            Location.popularity_score.desc(),
            Location.average_rating.desc()
        ).limit(limit).all()
    
    @staticmethod
    def get_nearby_attractions(latitude, longitude, radius_km=50, limit=10):
        """
        Get attractions within radius using bounding box
        (Can be optimized with PostGIS for production)
        """
        # Approximate: 1 degree ≈ 111 km
        lat_offset = radius_km / 111.0
        lon_offset = radius_km / (111.0 * math.cos(math.radians(latitude)))
        
        return Location.query.filter(
            Location.latitude >= latitude - lat_offset,
            Location.latitude <= latitude + lat_offset,
            Location.longitude >= longitude - lon_offset,
            Location.longitude <= longitude + lon_offset,
            Location.type == 'ATTRACTION',
            Location.is_active == True
        ).order_by(
            Location.popularity_score.desc(),
            Location.average_rating.desc()
        ).limit(limit).all()
