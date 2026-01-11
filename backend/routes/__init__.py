from .locations import locations_bp
from .environmental import environmental_bp
from .milestones import milestones_bp
from .images import images_bp

def register_blueprints(app):
    """Register all route blueprints with Flask app"""
    app.register_blueprint(locations_bp)
    app.register_blueprint(environmental_bp)
    app.register_blueprint(milestones_bp)
    app.register_blueprint(images_bp)

__all__ = ['register_blueprints']
