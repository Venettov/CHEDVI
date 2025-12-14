from app import db
from datetime import datetime

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    organization = db.Column(db.String(200))
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class ResourceRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    zip_code = db.Column(db.String(10))
    resource_type = db.Column(db.String(100), nullable=False)
    needs_description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Newsletter(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    subscribed_at = db.Column(db.DateTime, default=datetime.utcnow)

class NeighborhoodHealth(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    census_tract = db.Column(db.String(50))
    
    # Demographics
    total_population = db.Column(db.Integer)
    median_income = db.Column(db.Integer)
    poverty_rate = db.Column(db.Float)
    unemployment_rate = db.Column(db.Float)
    
    # Health Metrics
    diabetes_rate = db.Column(db.Float)
    obesity_rate = db.Column(db.Float)
    asthma_rate = db.Column(db.Float)
    mental_distress_rate = db.Column(db.Float)
    high_blood_pressure = db.Column(db.Float)
    
    # Access Metrics
    food_access_score = db.Column(db.Float)
    lack_health_insurance = db.Column(db.Float)
    
    # Metadata
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        """Helper to convert the row to JSON for the graphs"""
        return {
            'name': self.name,
            'income': self.median_income,
            'poverty': self.poverty_rate,
            'diabetes': self.diabetes_rate,
            'obesity': self.obesity_rate,
            'asthma': self.asthma_rate,
            'mental_distress': self.mental_distress_rate,
            'population': self.total_population
        }

# --- NEW ADMIN MODEL (Fixed Size) ---
class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    # INCREASED TO 256 TO PREVENT ERROR
    password_hash = db.Column(db.String(256), nullable=False)

    def __repr__(self):
        return f'<Admin {self.username}>'