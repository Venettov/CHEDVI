import pandas as pd
import os
from app import app, db
from models import NeighborhoodHealth

# --- CONFIGURATION ---
# We use the exact filename you have in your folder
CSV_FILENAME = 'neighborhood_data.csv' 
# ---------------------

def seed_database():
    # Pre-check: Does the file exist?
    if not os.path.exists(CSV_FILENAME):
        print(f"❌ ERROR: Could not find file: {CSV_FILENAME}")
        print("   Make sure the file is in the same folder as app.py")
        print("   Current files in this folder:")
        print(os.listdir())
        return

    print(f"📂 Found CSV file: {CSV_FILENAME}")
    
    # Read the CSV
    try:
        df = pd.read_csv(CSV_FILENAME)
        print(f"📊 Loaded {len(df)} rows of data.")
    except Exception as e:
        print(f"❌ Error reading CSV: {e}")
        return

    with app.app_context():
        print("🗑️  Clearing old neighborhood data...")
        db.session.query(NeighborhoodHealth).delete()
        
        print("🌱 Seeding new neighborhood data...")
        try:
            for index, row in df.iterrows():
                neighborhood = NeighborhoodHealth(
                    name=row['name'],
                    census_tract=row['Census Tract'],
                    
                    # Demographics
                    total_population=int(row['Total Population']),
                    median_income=int(row['Median Annual Household Income']),
                    poverty_rate=float(row['Poverty Rate']),
                    unemployment_rate=float(row['Unemployment Rate']),
                    
                    # Health Metrics
                    diabetes_rate=float(row['Percentage reported Diabetes']),
                    obesity_rate=float(row['Percentage reported Obesity']),
                    asthma_rate=float(row['Percentage reported Asthma']),
                    mental_distress_rate=float(row['Percentage reported Mental Distress']),
                    high_blood_pressure=float(row['Percentage reported High Blood Pressure']),
                    
                    # Access
                    food_access_score=float(row['Low Food Access Score']),
                    lack_health_insurance=float(row['Lack Health Insurance'])
                )
                db.session.add(neighborhood)
            
            db.session.commit()
            print("✅ Success! Database populated.")
            
        except Exception as e:
            db.session.rollback()
            print(f"❌ Database Error: {e}")

if __name__ == '__main__':
    seed_database()