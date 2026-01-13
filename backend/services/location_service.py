from repositories.location_repo import LocationRepository

class LocationService:
    """
    Business logic for locations
    
    Similar to Spring's @Service
    Handles validation, transformation, and complex queries
    """
    
    @staticmethod
    def search_locations(query, limit=5):
        """
        Search locations with validation
        
        Args:
            query: Search string (minimum 3 chars)
            limit: Max results (max 10)
        
        Returns:
            List of serialized locations
        
        Raises:
            ValueError: If query is invalid
        """
        # Validation
        if not query or len(query) < 3:
            raise ValueError('Search query must be at least 3 characters')
        
        # Business logic: cap limit at 10
        limit = min(limit, 10)
        
        # Call repository
        locations = LocationRepository.search_by_name(query, limit)
        
        # Serialize and return
        return [LocationService._serialize_location(loc) for loc in locations]
    
    @staticmethod
    def get_location_detail(location_id):
        """
        Get location with related attractions
        
        Based on location type:
        - STATE: Returns attractions in that state
        - CITY: Returns attractions in that city
        - ATTRACTION: Returns other attractions in same city
        """
        location = LocationRepository.get_by_id(location_id)
        
        if not location:
            raise ValueError('Location not found')
        
        # Serialize main location
        location_data = LocationService._serialize_location(location)
        
        # Get related attractions based on type
        related_attractions = []
        
        if location.type == 'STATE':
            attractions = LocationRepository.get_attractions_by_state(
                location.state_name,
                limit=8
            )
            related_attractions = [
                LocationService._serialize_location(attr) 
                for attr in attractions
            ]
        
        elif location.type == 'CITY':
            attractions = LocationRepository.get_attractions_by_city(
                location.city_name,
                location.state_name,
                limit=8
            )
            related_attractions = [
                LocationService._serialize_location(attr) 
                for attr in attractions
            ]
        
        elif location.type == 'ATTRACTION':
            attractions = LocationRepository.get_other_attractions_in_city(
                location.city_name,
                location.state_name,
                exclude_id=location.id,
                limit=8
            )
            related_attractions = [
                LocationService._serialize_location(attr) 
                for attr in attractions
            ]
        
        return {
            'location': location_data,
            'related_attractions': related_attractions,
            'attraction_count': len(related_attractions)
        }
    
    @staticmethod
    def _serialize_location(location):
        """Convert Location entity to dictionary for JSON response"""
        return {
            'id': location.id,
            'name': location.name,
            'type': location.type,
            'country_name': location.country_name,
            'state_name': location.state_name,
            'city_name': location.city_name,
            'latitude': float(location.latitude),
            'longitude': float(location.longitude),
            'description': location.description,
            'image_url': location.image_url,
            'popularity_score': location.popularity_score,
            'average_rating': float(location.average_rating) if location.average_rating else 0,
            'total_reviews': location.total_reviews,
            'is_active': location.is_active,
            'created_at': location.created_at.isoformat(),
            'updated_at': location.updated_at.isoformat()
        }
