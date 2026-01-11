from flask import Blueprint, request, jsonify
from services.image_service import ImageService
from repositories.location_repo import LocationRepository
from extensions import db

images_bp = Blueprint('images', __name__, url_prefix='/api/images')

@images_bp.route('/fetch-for-location/<int:location_id>', methods=['POST'])
def fetch_location_images(location_id):
    """
    Fetch and save best image for a location from Pexels
    
    Example: POST /api/images/fetch-for-location/3
    """
    try:
        location = LocationRepository.get_by_id(location_id)
        
        if not location:
            return jsonify({'error': 'Location not found'}), 404
        
        # Search for image
        image_url = ImageService.get_best_image(location.name)
        
        if image_url:
            # Update location with new image
            location.image_url = image_url
            db.session.commit()
            
            return jsonify({
                'status': 'success',
                'location_id': location_id,
                'image_url': image_url,
                'message': f'Updated image for {location.name}'
            }), 200
        
        return jsonify({'error': 'No images found'}), 404
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500


@images_bp.route('/fetch-all', methods=['POST'])
def fetch_all_images():
    """
    Batch fetch images for all locations
    
    Example: POST /api/images/fetch-all
    """
    try:
        from models.location import Location
        
        locations = Location.query.filter(Location.is_active == True).all()
        
        updated = 0
        failed = 0
        
        for location in locations:
            image_url = ImageService.get_best_image(location.name)
            
            if image_url:
                location.image_url = image_url
                updated += 1
                print(f"updated {updated}")
            else:
                failed += 1
                print(f"failed {failed}")
        
        db.session.commit()
        
        return jsonify({
            'status': 'success',
            'total': len(locations),
            'updated': updated,
            'failed': failed,
            'message': f'Updated {updated} locations with images'
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
