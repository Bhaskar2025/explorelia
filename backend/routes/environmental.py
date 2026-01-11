from flask import Blueprint, request, jsonify
from services.aqi_service import fetch_aqi
from services.weather_service import fetch_weather

environmental_bp = Blueprint('environmental', __name__, url_prefix='/api')

@environmental_bp.route('/environmental', methods=['GET'])
def get_environmental():
    """
    Get environmental data for a location
    
    Returns: AQI, temperature, weather description
    
    Query Parameters:
    - location: City name (required)
    
    Example: GET /api/environmental?location=mumbai
    """
    location = request.args.get('location')
    
    if not location:
        return jsonify({'error': 'location parameter required'}), 400
    
    try:
        aqi_data = fetch_aqi(location)['data']
        lat, lon = aqi_data['city']['geo']
        weather_info = fetch_weather(lat, lon)
        
        return jsonify({
            'city': location,
            'aqi': aqi_data['aqi'],
            'tempC': weather_info['tempC'],
            'weather': weather_info['weather']
        }), 200
    
    except RuntimeError as re:
        return jsonify({'error': str(re)}), 502
    except Exception as e:
        print(f"Error in get_environmental: {str(e)}")
        return jsonify({'error': 'Unexpected error', 'details': str(e)}), 500
