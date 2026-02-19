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
    __tablename__ = 'neighborhood_health'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    census_tract = db.Column(db.String(50))
    lack_health_insurance = db.Column(db.Float, default=0.0)
    latitude = db.Column(db.Float, default=0.0)
    longitude = db.Column(db.Float, default=0.0)
    high_school_higher = db.Column(db.Float, default=0.0)
    public_insurance = db.Column(db.Integer, default=0)
    private_insurance = db.Column(db.Integer, default=0)
    black_alone = db.Column(db.Integer, default=0)
    asian_alone = db.Column(db.Integer, default=0)
    other_race = db.Column(db.Integer, default=0)
    two_plus_races = db.Column(db.Integer, default=0)
    visited_dentist = db.Column(db.Float, default=0.0)
    depression_rate = db.Column(db.Float, default=0.0)
    no_physical_leisure = db.Column(db.Float, default=0.0)
    current_smoking = db.Column(db.Float, default=0.0)
    dr_checkup_rate = db.Column(db.Float, default=0.0)
    renter_occupied = db.Column(db.Integer, default=0)
    vacant_housing = db.Column(db.Integer, default=0)
    median_rent = db.Column(db.Integer, default=0)
    housing_units = db.Column(db.Integer, default=0)
    overcrowded_housing = db.Column(db.Float, default=0.0)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)

    def __repr__(self):
        return f'<Admin {self.username}>'