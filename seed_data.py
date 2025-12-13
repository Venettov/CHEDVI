import pandas as pd
from app import app, db
from models import NeighborhoodHealth

# 1. Read the CSV file
csv_file = 'final_merged_data (1)_1752002400233.csv'  # Make sure this matches your uploaded filename exactly
df = pd.read_csv(csv_file)

def seed_database():
    with app.app_context():
        # Optional: Clear old data to avoid duplicates
        print("🗑️  Clearing old neighborhood data...")
        db.session.query(NeighborhoodHealth).delete()
        
        print("🌱 Seeding new neighborhood data...")
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
        print("✅ Success! Database populated with CSV data.")

if __name__ == '__main__':
    seed_database()