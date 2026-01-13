import imp
from flask import Flask
from flask_cors import CORS
import config
from routes import register_blueprints
from extensions import db


def create_app():
    """
    Application factory pattern
    
    Similar to Spring's @SpringBootApplication
    Creates and configures the Flask app
    """
    app = Flask(__name__)
    # Enable debug mode based on configuration
    app.config['DEBUG'] = config.DEBUG
    app.config['ENV'] = config.FLASK_ENV
    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = config.DATABASE_URL
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JSON_SORT_KEYS'] = False
    
    # Initialize extensions
    db.init_app(app)
    CORS(app, origins=config.CORS_ORIGINS)
    
    # Import models (must be done after db.init_app)
    from models import Location  # noqa
    
    # Register blueprints (routes)
    register_blueprints(app)
    
    # Create tables
    with app.app_context():
        db.create_all()
    
    return app


app = create_app()  # App created globally ALWAYS


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
