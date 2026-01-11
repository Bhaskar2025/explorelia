from datetime import datetime
from extensions import db

class Location(db.Model):
    """Location entity - represents a place in the database"""
    
    __tablename__ = 'locations'
    
    id = db.Column(db.BigInteger, primary_key=True)
    name = db.Column(db.String(255), nullable=False, index=True)
    type = db.Column(db.String(50), nullable=False, index=True)  # STATE, CITY, ATTRACTION
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
