import json
from flask import Blueprint, request, jsonify
from services.location_service import LocationService

locations_bp = Blueprint('locations', __name__, url_prefix='/api/locations')

@locations_bp.route('/search', methods=['GET'])
def search_locations():
    """
    Search locations by name
    
    Query Parameters:
    - q: Search query (minimum 3 characters)
    - limit: Number of results (default: 5, max: 10)
    
    Example: GET /api/locations/search?q=taj&limit=5
    """

    print("Test location")

    try:
        query = request.args.get('q', '').strip()
        limit = request.args.get('limit', 5, type=int)
        
        results = LocationService.search_locations(query, limit)
        
        return jsonify({
            'status': 'success',
            'count': len(results),
            'results': results
        }), 200
    
    except ValueError as ve:
        return jsonify({'status': 'error', 'message': str(ve)}), 400
    except Exception as e:
        print(f"Error in search_locations: {str(e)}")
        return jsonify({'status': 'error', 'message': 'Internal server error'}), 500


@locations_bp.route('/<int:location_id>', methods=['GET'])
def get_location_detail(location_id):
    """
    Get location details with related attractions
    
    Returns location info + related attractions based on type
    
    Example: GET /api/locations/1
    """
    try:
        result = LocationService.get_location_detail(location_id)
        print("location id : ")
        jsonres = jsonify(result)
        print(jsonres)
        return jsonres,200
    
    except ValueError as ve:
        return jsonify({'error': str(ve)}), 404
    except Exception as e:
        print(f"Error in get_location_detail: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500
