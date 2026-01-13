from flask import Blueprint, jsonify

milestones_bp = Blueprint('milestones', __name__, url_prefix='/api/user')

@milestones_bp.route('/<user_id>/milestones', methods=['GET'])
def get_user_milestones(user_id):
    """
    Get user milestones
    
    Example: GET /api/user/123/milestones
    """
    return jsonify({
        'userId': user_id,
        'current': {
            'title': 'Low-Emission Explorer',
            'description': 'Visited 5 attractions via low-emission routes.',
            'progressPercent': 62
        }
    }), 200
