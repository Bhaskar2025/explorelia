from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

from services.aqi_service import fetch_aqi
from services.weather_service import fetch_weather
from services.config import DATABASE_URL

app = Flask(__name__)

# Database configuration (from config.py)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSON_SORT_KEYS'] = False
db = SQLAlchemy(app)
# Allow all origins for dev; tighten in production
CORS(app)

# ============ DATABASE MODEL ============
class Location(db.Model):
    __tablename__ = 'locations'
    
    id = db.Column(db.BigInteger, primary_key=True)
    name = db.Column(db.String(255), nullable=False, index=True)
    type = db.Column(db.String(50), nullable=False, index=True)
    country_name = db.Column(db.String(100), nullable=False)
    state_name = db.Column(db.String(100), nullable=False, index=True)
    city_name = db.Column(db.String(100), nullable=False, index=True)
    latitude = db.Column(db.Numeric(10, 8), nullable=False)
    longitude = db.Column(db.Numeric(11, 8), nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column(db.String(500))
    popularity_score = db.Column(db.Integer, default=0, index=True)
    average_rating = db.Column(db.Float, default=0)
    total_reviews = db.Column(db.Integer, default=0)
    is_active = db.Column(db.Boolean, default=True, index=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<Location {self.name}>'


@app.get("/api/environmental")
def get_environmental():
    """
    Unified endpoint that returns AQI, temperature and weather description
    for a given city. Example: /api/environmental?location=mumbai
    """
    location = request.args.get("location")
    if not location:
        return jsonify({"error": "location parameter required"}), 400
    try:
        aqi = fetch_aqi(location)["data"]

        lat, lon = aqi["city"]["geo"]
        weather_info = fetch_weather(lat, lon)
        return jsonify({
            "city": location,
            "aqi": aqi["aqi"],
            "tempC": weather_info["tempC"],
            "weather": weather_info["weather"]
        })
    except RuntimeError as re:
        # Propagated from service functions
        return jsonify({"error": str(re)}), 502
    except Exception as e:
        # Catch‑all for unexpected errors
        return jsonify({"error": "Unexpected error", "details": str(e)}), 500


@app.get("/api/user/<user_id>/milestones")
def get_user_milestones(user_id):
    return jsonify({
        "userId": user_id,
        "current": {
            "title": "Low‑Emission Explorer",
            "description": "Visited 5 attractions via low‑emission routes.",
            "progressPercent": 62
        }
    })


# ============ NEW: LOCATION TYPEAHEAD ENDPOINT ============
@app.get("/api/locations/search")
def search_locations():
    """
    Search locations by name and return top 5 results sorted by popularity.
    
    Query Parameters:
    - q: Search query (minimum 3 characters)
    - limit: Number of results to return (default: 5, max: 10)
    
    Example: GET /api/locations/search?q=taj&limit=5
    
    Returns:
    {
        "status": "success",
        "count": 5,
        "results": [
            {
                "id": 123,
                "name": "Taj Mahal",
                "type": "ATTRACTION",
                "state_name": "Uttar Pradesh",
                "city_name": "Agra",
                "popularity_score": 95,
                "average_rating": 4.7,
                ...
            }
        ]
    }
    """
    try:
        # Get and validate query parameters
        search_query = request.args.get('q', '').strip()
        limit = request.args.get('limit', 5, type=int)
        
        # Validate minimum length
        if not search_query or len(search_query) < 3:
            return jsonify({
                'status': 'error',
                'message': 'Search query must be at least 3 characters'
            }), 400
        
        # Validate limit
        limit = min(limit, 10)  # Cap at 10 results
        
        # Database query using SQLAlchemy
        results = (
            Location.query
            .filter(
                Location.is_active == True,
                Location.name.ilike(f'%{search_query}%')
            )
            .order_by(
                Location.popularity_score.desc(),  # Sort by popularity first
                Location.average_rating.desc()     # Then by rating
            )
            .limit(limit)
            .all()
        )
        
        # Serialize results
        serialized_results = [
            {
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
                'total_reviews': location.total_reviews
            }
            for location in results
        ]
        
        return jsonify({
            'status': 'success',
            'count': len(serialized_results),
            'results': serialized_results
        }), 200
    
    except Exception as e:
        print(f"Error in search_locations: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': 'Internal server error'
        }), 500


@app.get("/api/locations/<int:location_id>")
def get_location_by_id(location_id):
    """Get location details by ID"""
    location = Location.query.get(location_id)
    
    if not location or not location.is_active:
        return jsonify({'error': 'Location not found'}), 404
    
    return jsonify({
        'id': location.id,
        'name': location.name,
        'type': location.type,
        'city_name': location.city_name,
        'state_name': location.state_name,
        'country_name': location.country_name,
        'description': location.description,
        'image_url': location.image_url,
        'latitude': float(location.latitude),
        'longitude': float(location.longitude),
        'average_rating': float(location.average_rating),
        'total_reviews': location.total_reviews,
        'popularity_score': location.popularity_score,
        'created_at': location.created_at.isoformat(),
        'updated_at': location.updated_at.isoformat()
    }), 200


if __name__ == "__main__":
    # Run Flask for local dev
    app.run(host="127.0.0.1", port=5000, debug=True)
