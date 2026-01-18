import os
import logging
import json
import pandas as pd
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from werkzeug.middleware.proxy_fix import ProxyFix

# Configure logging
logging.basicConfig(level=logging.DEBUG)

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)

# Create the app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key-change-in-production")
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

# Configure the database
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL", "sqlite:///chedvi.db")
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_recycle": 300,
    "pool_pre_ping": True,
}

# Initialize the app with the extension
db.init_app(app)

with app.app_context():
    # Import models to ensure tables are created
    import models
    db.create_all()

# Import routes
from routes import *

# =========================================================================
# NEW DASHBOARD ROUTE (HYBRID DATA ARCHITECTURE)
# =========================================================================
@app.route('/dashboard')
def dashboard():
    # 1. FETCH DATA FROM DB (Using the CSV as the database source)
    try:
        # Verify file exists to prevent crashing
        if os.path.exists('neighborhood_health.csv'):
            df = pd.read_csv('neighborhood_health.csv')
            
            # 2. TRANSFORM TO COLUMN-BASED JSON (Format required by Chart.js)
            db_data = {
                "neighborhoods": df['name'].tolist(),
                "income": df['median_income'].tolist(),
                "poverty": df['poverty_rate'].tolist(),
                "unemployment": df['unemployment_rate'].tolist(),
                # "education": MISSING IN DB - JavaScript will use the fallback data for this!
                "foodAccess": df['food_access_score'].tolist(),
                "insurance": df['lack_health_insurance'].tolist(),
                "diabetes": df['diabetes_rate'].tolist(),
                "obesity": df['obesity_rate'].tolist(),
                "asthma": df['asthma_rate'].tolist(),
                "mentalDistress": df['mental_distress_rate'].tolist(),
                "highBloodPressure": df['high_blood_pressure'].tolist()
            }
        else:
            print("⚠️ CSV file not found. Dashboard will use static fallback data.")
            db_data = None 
            
    except Exception as e:
        print(f"❌ Database/CSV Error: {e}")
        db_data = None # This triggers the fallback in JS

    # 3. PASS TO TEMPLATE
    return render_template('dashboard.html', db_data=db_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)