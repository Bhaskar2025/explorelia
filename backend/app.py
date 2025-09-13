# backend/app.py
from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime, timedelta
import random
import json
import os

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    # Load mock data
    def load_mock_data(filename):
        file_path = os.path.join(os.path.dirname(__file__), 'mock_data', filename)
        with open(file_path, 'r') as file:
            return json.load(file)
    
    # Health check endpoint
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({"status": "healthy", "timestamp": datetime.now().isoformat()})
    
    # Recommendations endpoints
    @app.route('/api/recommendations', methods=['GET'])
    def get_recommendations():
        user_id = request.args.get('userId', 'default')
        data = load_mock_data('attractions.json')
        
        # Simple personalization based on user ID
        if user_id != 'default':
            random.seed(user_id)  # For consistent results per user
            random.shuffle(data)
        
        return jsonify(data[:6])  # Return first 6 items
    
    @app.route('/api/recommendations/search', methods=['GET'])
    def search_attractions():
        query = request.args.get('q', '')
        data = load_mock_data('attractions.json')
        
        if query:
            results = [item for item in data if query.lower() in item['name'].lower()]
        else:
            results = data[:5]
        
        return jsonify(results)
    
    # Environmental data endpoint
    @app.route('/api/environmental', methods=['GET'])
    def get_environmental_data():
        location = request.args.get('location', 'jaipur')
        data = load_mock_data('environmental.json')
        
        # Update with current time for realism
        current_time = datetime.now()
        for i in range(24):
            hour_key = f"hour_{i}"
            if hour_key in data['aqi_trend']:
                data['aqi_trend'][hour_key]['timestamp'] = (
                    current_time - timedelta(hours=23-i)
                ).strftime('%Y-%m-%d %H:%M:%S')
        
        # Add some random variation to simulate real-time data
        data['current_aqi'] = random.randint(80, 180)
        data['current_temperature'] = random.randint(25, 38)
        
        return jsonify(data)
    
    # Route planning endpoint
    @app.route('/api/route', methods=['POST'])
    def calculate_route():
        request_data = request.get_json()
        origin = request_data.get('origin', '')
        destination = request_data.get('destination', '')
        preference = request_data.get('preference', 'fastest')
        
        # Mock route data
        data = load_mock_data('routes.json')
        
        # Modify based on preference
        if preference == 'eco_friendly':
            data['total_time'] = data['total_time'] * 1.2  # Eco routes take 20% longer
            data['aqi_exposure'] = data['aqi_exposure'] * 0.8  # 20% less AQI exposure
        
        return jsonify(data)
    
    # User milestones endpoint
    @app.route('/api/user/<user_id>/milestones', methods=['GET'])
    def get_user_milestones(user_id):
        data = load_mock_data('milestones.json')
        
        # Personalize based on user ID
        if user_id != 'default':
            random.seed(user_id)
            data['progress'] = random.randint(10, 90)
            data['next_milestone'] = f"Eco Explorer Level {random.randint(2, 5)}"
        
        return jsonify(data)
    
    # Sensors endpoint
    @app.route('/api/sensors', methods=['GET'])
    def get_sensors():
        data = load_mock_data('sensors.json')
        return jsonify(data)
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)