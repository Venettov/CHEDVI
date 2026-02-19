import os
import sys
import shutil
import pandas as pd
from threading import Thread
from flask_mail import Message 
from app import app, db, mail
from werkzeug.security import generate_password_hash, check_password_hash
from flask import render_template, request, redirect, url_for, flash, jsonify, session
from models import Contact, ResourceRequest, Newsletter, NeighborhoodHealth, Admin
from forms import ContactForm, ResourceRequestForm, NewsletterForm
from sqlalchemy.exc import SQLAlchemyError

# Configuration
DATA_FILE = 'neighborhood_data.csv'
BACKUP_FILE = 'neighborhood_data.bak'

# --- HELPER FUNCTIONS ---

def send_async_email(app, msg):
    with app.app_context():
        try:
            print("DEBUG: Starting background email task...", file=sys.stderr)
            mail.send(msg)
            print("DEBUG: EMAIL SENT SUCCESSFULLY! Check spam folder.", file=sys.stderr)
        except Exception as e:
            print(f"ERROR: EMAIL FAILED: {e}", file=sys.stderr)

def verify_admin(username, password):
    user = Admin.query.filter_by(username=username).first()
    if user and check_password_hash(user.password_hash, password):
        return True
    return False

def clean_dataframe_columns(df):
    """
    Standardizes column names and maps Camden-specific CSV headers to database keys.
    This ensures all 32 columns are captured without any mismatch.
    """
    # 1. Basic cleaning: lowercase, underscore, strip spaces, remove symbols
    df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_').str.replace('%', '').str.replace('$', '')
    
    # 2. COMPLETE MAPPING (Bridges CSV headers to Model field names)
    column_map = {
        # Core & Economic
        'median_annual_household_income': 'median_income',
        'low_food_access_score': 'food_access_score',
        'high_school_or_higher': 'high_school_higher',
        
        # Health Outcomes
        'percentage_reported_diabetes': 'diabetes_rate',
        'percentage_reported_obesity': 'obesity_rate',
        'percentage_reported_asthma': 'asthma_rate',
        'percentage_reported_mental_distress': 'mental_distress_rate',
        'percentage_reported_high_blood_pressure': 'high_blood_pressure',
        'percentage_reported_depression': 'depression_rate',
        'percentage_reported_no_physical_leisure': 'no_physical_leisure',
        'percentage_reported_current_smoking': 'current_smoking',
        'percentage_visited_dr_for_check_up': 'dr_checkup_rate',
        'percentage_visited_dentist': 'visited_dentist',
        
        # Demographics & Insurance
        'public_health_insurance': 'public_insurance',
        'private_health_insurance': 'private_insurance',
        'black_or_african_american_alone': 'black_alone',
        'some_other_race_alone': 'other_race',
        'two_or_more_races': 'two_plus_races',
        
        # Housing
        'renter_occupied_housing_units': 'renter_occupied',
        'vacant_housing_units': 'vacant_housing',
        'median_gross_rent_(/month)': 'median_rent',
        'percentage_overcrowded_housing_units': 'overcrowded_housing'
    }
    
    df.rename(columns=column_map, inplace=True)
    return df

def clean_numeric(value):
    """
    Robust cleaning: Removes symbols, handles pandas NaN (Not a Number), and converts to float/int.
    """
    if pd.isna(value) or value is None:
        return 0 
        
    if isinstance(value, str):
        clean = value.replace(',', '').replace('$', '').replace('%', '').strip()
        try:
            if '.' in clean:
                return float(clean)
            return int(clean)
        except ValueError:
            return 0 
    return value

def reload_database_from_csv():
    """
    Clears existing data and re-populates the database using ALL 32 
    metrics from neighborhood_data.csv.
    """
    try:
        if not os.path.exists(DATA_FILE):
            return False, "Data file not found."

        df = pd.read_csv(DATA_FILE)
        df = clean_dataframe_columns(df).fillna(0) 

        db.session.query(NeighborhoodHealth).delete()
        
        for _, row in df.iterrows():
            neighborhood = NeighborhoodHealth(
                name=row.get('name', 'Unknown'),
                census_tract=row.get('census_tract', 'N/A'),
                latitude=row.get('latitude', 0.0),
                longitude=row.get('longitude', 0.0),
                total_population=clean_numeric(row.get('total_population', 0)),
                median_income=clean_numeric(row.get('median_income', 0)),
                poverty_rate=clean_numeric(row.get('poverty_rate', 0.0)),
                unemployment_rate=clean_numeric(row.get('unemployment_rate', 0.0)),
                high_school_higher=clean_numeric(row.get('high_school_higher', 0.0)),
                # Health Metrics
                diabetes_rate=clean_numeric(row.get('diabetes_rate', 0.0)),
                obesity_rate=clean_numeric(row.get('obesity_rate', 0.0)),
                asthma_rate=clean_numeric(row.get('asthma_rate', 0.0)),
                mental_distress_rate=clean_numeric(row.get('mental_distress_rate', 0.0)),
                high_blood_pressure=clean_numeric(row.get('high_blood_pressure', 0.0)),
                depression_rate=clean_numeric(row.get('depression_rate', 0.0)),
                visited_dentist=clean_numeric(row.get('visited_dentist', 0.0)),
                no_physical_leisure=clean_numeric(row.get('no_physical_leisure', 0.0)),
                current_smoking=clean_numeric(row.get('current_smoking', 0.0)),
                dr_checkup_rate=clean_numeric(row.get('dr_checkup_rate', 0.0)),
                # Access & Demographics
                food_access_score=clean_numeric(row.get('food_access_score', 0.0)),
                lack_health_insurance=clean_numeric(row.get('lack_health_insurance', 0.0)),
                public_insurance=clean_numeric(row.get('public_insurance', 0)),
                private_insurance=clean_numeric(row.get('private_insurance', 0)),
                black_alone=clean_numeric(row.get('black_alone', 0)),
                asian_alone=clean_numeric(row.get('asian_alone', 0)),
                other_race=clean_numeric(row.get('other_race', 0)),
                two_plus_races=clean_numeric(row.get('two_plus_races', 0)),
                # Housing
                housing_units=clean_numeric(row.get('housing_units', 0)),
                renter_occupied=clean_numeric(row.get('renter_occupied', 0)),
                vacant_housing=clean_numeric(row.get('vacant_housing', 0)),
                median_rent=clean_numeric(row.get('median_rent', 0)),
                overcrowded_housing=clean_numeric(row.get('overcrowded_housing', 0.0))
            )
            db.session.add(neighborhood)
        
        db.session.commit()
        return True, "Success: All 32 census and health metrics imported."

    except Exception as e:
        db.session.rollback()
        print(f"RELOAD ERROR: {e}", file=sys.stderr)
        return False, f"Reload failed: {str(e)}"

# --- ROUTES ---

@app.route('/')
def index(): return render_template('index.html')

@app.route('/about')
def about(): return render_template('about.html')

@app.route('/admin', methods=['GET'])
def admin(): return render_template('admin.html')

@app.route('/admin/login', methods=['POST'])
def admin_login():
    username = request.form.get('username')
    password = request.form.get('password')
    if verify_admin(username, password):
        session['admin_logged_in'] = True
        session['admin_user'] = username
        flash('Successfully logged in.', 'success')
    else:
        flash('Invalid Username or Password.', 'danger')
    return redirect(url_for('admin'))

@app.route('/admin/logout')
def admin_logout():
    session.pop('admin_logged_in', None)
    session.pop('admin_user', None)
    flash('Logged out successfully.', 'info')
    return redirect(url_for('admin'))

@app.route('/admin/db-fix')
def admin_db_fix():
    # Only allow logged-in admins
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))
    
    try:
        # This clears and recreates the tables based on your new Model fields
        db.drop_all()
        db.create_all()
        flash("Database structure reset successfully!", "success")
    except Exception as e:
        flash(f"Error resetting database: {str(e)}", "danger")
        
    return redirect(url_for('admin_dashboard')) 

@app.route('/admin/setup/<username>/<password>')
def admin_setup(username, password):
    try:
        existing = Admin.query.filter_by(username=username).first()
        if existing:
            return f"Admin '{username}' already exists!"
        hashed_pw = generate_password_hash(password)
        new_admin = Admin(username=username, password_hash=hashed_pw)
        db.session.add(new_admin)
        db.session.commit()
        return f"Success! Created admin '{username}'. You can now go to /admin to login."
    except Exception as e:
        return f"Error: {str(e)}"

@app.route('/admin/upload', methods=['POST'])
def admin_upload():
    if not session.get('admin_logged_in'):
        flash('Please log in first.', 'danger')
        return redirect(url_for('admin'))

    file = request.files.get('file')
    if not file or not file.filename.endswith('.csv'):
        flash('Please upload a valid CSV file.', 'warning')
        return redirect(url_for('admin'))

    try:
        if os.path.exists(DATA_FILE):
            shutil.copy(DATA_FILE, BACKUP_FILE)

        new_data = pd.read_csv(file)
        new_data = clean_dataframe_columns(new_data)

        if request.form.get('replace_all'):
            new_data.to_csv(DATA_FILE, index=False)
            flash('Full replacement mode: Old data overwritten.', 'info')
        else:
            if os.path.exists(DATA_FILE):
                current_data = pd.read_csv(DATA_FILE)
                current_data = clean_dataframe_columns(current_data)
                
                if 'name' not in new_data.columns:
                    found_cols = ", ".join(list(new_data.columns))
                    flash(f'Error: CSV missing "Name" column. Found: {found_cols}', 'danger')
                    return redirect(url_for('admin'))
                
                if 'name' not in current_data.columns:
                    new_data.to_csv(DATA_FILE, index=False)
                    flash('Warning: Existing data corrupted. Performed full replacement.', 'warning')
                else:
                    current_data.set_index('name', inplace=True)
                    new_data.set_index('name', inplace=True)
                    merged_data = new_data.combine_first(current_data).reset_index()
                    merged_data.to_csv(DATA_FILE, index=False)
                    flash('Smart Merge: New data integrated with existing records.', 'info')
            else:
                new_data.to_csv(DATA_FILE, index=False)

        success, msg = reload_database_from_csv()
        if success:
            flash(f'Success! {msg}', 'success')
        else:
            flash(f'Error during database update: {msg}', 'danger') 

    except Exception as e:
        flash(f'Critical Error: {str(e)}', 'danger')

    return redirect(url_for('admin'))

@app.route('/admin/rollback', methods=['POST'])
def admin_rollback():
    if not session.get('admin_logged_in'):
        flash('Please log in first.', 'danger')
        return redirect(url_for('admin'))

    try:
        if os.path.exists(BACKUP_FILE):
            shutil.copy(BACKUP_FILE, DATA_FILE)
            success, msg = reload_database_from_csv()
            if success:
                flash('Rollback successful.', 'success')
            else:
                flash(f'Restored file but DB update failed: {msg}', 'warning')
        else:
            flash('No backup file found.', 'warning')
    except Exception as e:
        flash(f'Rollback failed: {str(e)}', 'danger')

    return redirect(url_for('admin'))

# --- DASHBOARD & ANALYTICS ROUTES ---

@app.route('/dashboard')
def dashboard():
    all_neighborhoods = NeighborhoodHealth.query.all()
    
    # Handle case where database is empty
    if not all_neighborhoods:
        return render_template('dashboard.html', 
                               total_population="0", neighborhood_count=0,
                               min_diabetes=0, max_diabetes=0, diabetes_gap=0,
                               min_income=0, max_income=0, income_ratio=0,
                               min_poverty=0, max_poverty=0, poverty_gap=0,
                               dashboard_data=[])

    total_population = sum(n.total_population for n in all_neighborhoods)
    
    # 1. Calculate Diabetes Stats
    diabetes_rates = [n.diabetes_rate for n in all_neighborhoods]
    min_diabetes = min(diabetes_rates) if diabetes_rates else 0
    max_diabetes = max(diabetes_rates) if diabetes_rates else 0
    diabetes_gap = round(max_diabetes - min_diabetes, 1)

    # 2. Calculate Income Stats
    incomes = [n.median_income for n in all_neighborhoods]
    min_income = min(incomes) if incomes else 0
    max_income = max(incomes) if incomes else 0
    # Avoid division by zero
    income_ratio = round(max_income / min_income, 1) if min_income > 0 else 0

    # 3. Calculate Poverty Stats
    poverty_rates = [n.poverty_rate for n in all_neighborhoods]
    min_poverty = min(poverty_rates) if poverty_rates else 0
    max_poverty = max(poverty_rates) if poverty_rates else 0
    poverty_gap = round(max_poverty - min_poverty, 1)

    # Prepare list for the table
    dashboard_data = []
    for n in all_neighborhoods:
        dashboard_data.append({
            'name': n.name,
            'population': n.total_population,
            'income': n.median_income,
            'diabetes': n.diabetes_rate,
            'poverty': n.poverty_rate,
            'obesity': getattr(n, 'obesity_rate', 0)
        })

    return render_template('dashboard.html', 
                           total_population=f"{total_population:,}", 
                           neighborhood_count=len(all_neighborhoods),
                           min_diabetes=min_diabetes,
                           max_diabetes=max_diabetes,
                           diabetes_gap=diabetes_gap,
                           min_income=f"{min_income/1000:.0f}k", 
                           max_income=f"{max_income/1000:.0f}k",
                           income_ratio=income_ratio,
                           min_poverty=min_poverty,
                           max_poverty=max_poverty,
                           poverty_gap=poverty_gap,
                           dashboard_data=dashboard_data)
@app.route('/insights')
def insights():
    all_n = NeighborhoodHealth.query.all()
    if not all_n: return render_template('insights.html', total_population="0", insights_data=[])

    total_population = sum(n.total_population for n in all_n)
    
    # Aggregates for stat cards
    diabetes_rates = [n.diabetes_rate for n in all_n]
    avg_diabetes = sum(diabetes_rates) / len(diabetes_rates) if diabetes_rates else 0
    incomes = [n.median_income for n in all_n]
    avg_income = sum(incomes) / len(incomes) if incomes else 0
    poverty_rates = [n.poverty_rate for n in all_n]
    avg_poverty = sum(poverty_rates) / len(poverty_rates) if poverty_rates else 0
    
    highest_income_n = max(all_n, key=lambda x: x.median_income) if all_n else None
    highest_poverty_n = max(all_n, key=lambda x: x.poverty_rate) if all_n else None

    insights_data = []
    for n in all_n:
        insights_data.append({
            'name': n.name, 
            'income': n.median_income, 
            'poverty': n.poverty_rate, 
            'diabetes': n.diabetes_rate, 
            'obesity': getattr(n, 'obesity_rate', 0), 
            'asthma': getattr(n, 'asthma_rate', 0), 
            'mentalDistress': getattr(n, 'mental_distress_rate', 0), 
            'foodAccess': getattr(n, 'food_access_score', 0), 
            'insurance': getattr(n, 'lack_health_insurance', 0),
            'unemployment': getattr(n, 'unemployment_rate', 0), # Added
            'education': getattr(n, 'high_school_higher', 0),   # Added
            'housing': getattr(n, 'vacant_housing', 0),         # Added
            'highBloodPressure': getattr(n, 'high_blood_pressure', 0) # Added
        })

    return render_template('insights.html',
                           total_population=f"{total_population:,}",
                           neighborhood_count=len(all_n),
                           avg_diabetes=f"{avg_diabetes:.1f}",
                           min_diabetes=min(diabetes_rates) if diabetes_rates else 0,
                           max_diabetes=max(diabetes_rates) if diabetes_rates else 0,
                           avg_income=f"{avg_income:,.0f}",
                           min_income=min(incomes) if incomes else 0,
                           max_income=max(incomes) if incomes else 0,
                           avg_poverty=f"{avg_poverty:.1f}",
                           min_poverty=min(poverty_rates) if poverty_rates else 0,
                           max_poverty=max(poverty_rates) if poverty_rates else 0,
                           highest_income_n=highest_income_n,
                           highest_poverty_n=highest_poverty_n,
                           insights_data=insights_data) # <--- This is the key payload for the chart

@app.route('/neighborhoods')
def neighborhoods():
    all_n = NeighborhoodHealth.query.all()
    neighborhood_data = []
    for n in all_n: neighborhood_data.append({'id': n.id, 'name': n.name, 'population': n.total_population, 'income': n.median_income, 'poverty': n.poverty_rate, 'diabetes': n.diabetes_rate, 'equity_status': 'High Priority' if n.median_income < 30000 else 'Stable' if n.median_income > 50000 else 'Vulnerable'})
    return render_template('neighborhoods.html', neighborhood_data=neighborhood_data)

@app.route('/rankings')
def rankings():
    all_n = NeighborhoodHealth.query.all()
    rankings_data = [{'name': n.name, 'population': n.total_population, 'income': n.median_income, 'poverty': n.poverty_rate, 'diabetes': n.diabetes_rate} for n in all_n]
    return render_template('rankings.html', rankings_data=rankings_data)

@app.route('/policy')
def policy(): return render_template('policy.html')

@app.route('/resources', methods=['GET', 'POST'])
def resources():
    contact_form = ContactForm()
    resource_form = ResourceRequestForm()
    newsletter_form = NewsletterForm()

    if request.method == 'POST':
        # Get the hidden ID to know which form was submitted
        form_id = request.form.get('form_id')

        # 1. Handle Contact Form
        if form_id == 'contact_form':
            print("DEBUG: Contact Form Detected.") 
            
            if contact_form.validate_on_submit():
                print("DEBUG: Validation Passed.") 
                try:
                    # A. Save to Database
                    new_msg = Contact(
                        name=contact_form.name.data, 
                        email=contact_form.email.data, 
                        organization=contact_form.organization.data,
                        message=contact_form.message.data
                    )
                    db.session.add(new_msg)
                    db.session.commit()
                    
                    # B. Send Email (DIRECTLY - No Background Thread)
                    # We use the direct send method because threading was causing the "Silent Fail"
                    try:
                        sender_email = app.config.get('MAIL_DEFAULT_SENDER')
                        msg = Message(
                            subject=f"New Contact Form: {contact_form.organization.data}",
                            sender=sender_email,
                            recipients=['andre.riveraruiz@rutgers.edu']
                        )
                        msg.body = f"""
                        From: {contact_form.name.data}
                        Email: {contact_form.email.data}
                        
                        Message:
                        {contact_form.message.data}
                        """
                        
                        # Send immediately to ensure it leaves the server
                        mail.send(msg)
                        flash('Message sent successfully!', 'success')
                        
                    except Exception as e:
                        # If email fails, we still saved to DB, so we warn the user but don't crash
                        print(f"EMAIL FAILED: {str(e)}", file=sys.stderr)
                        flash(f'Message saved, but email notification failed: {str(e)}', 'warning')

                    return redirect(url_for('resources', _anchor='contact'))
                    
                except Exception as e:
                    db.session.rollback()
                    flash(f'Database Error: {e}', 'danger')
            else:
                 print(f"DEBUG: Validation Failed: {contact_form.errors}")
                 flash('Please correct the errors in the form below.', 'danger')

        # 2. Handle Newsletter
        elif form_id == 'newsletter_form' or 'newsletter_submit' in request.form:
            if newsletter_form.validate_on_submit():
                if not Newsletter.query.filter_by(email=newsletter_form.email.data).first():
                    db.session.add(Newsletter(email=newsletter_form.email.data))
                    db.session.commit()
                    flash('Subscribed!', 'success')
                else:
                    flash('Already subscribed.', 'info')
                return redirect(url_for('resources'))

    return render_template('resources.html', 
                           contact_form=contact_form, 
                           resource_form=resource_form, 
                           newsletter_form=newsletter_form)

@app.route('/api/neighborhoods')
def api_neighborhoods():
    """Returns all neighborhood data as JSON (Useful for external apps/maps)"""
    all_n = NeighborhoodHealth.query.all()
    if not all_n:
        return jsonify([])
    # Uses the .to_dict() helper we defined in models.py
    return jsonify([n.to_dict() for n in all_n])

@app.route('/api/health-metrics')
def api_health_metrics():
    """Returns aggregate health stats as JSON"""
    all_n = NeighborhoodHealth.query.all()
    if not all_n:
        return jsonify({'error': 'No data available'})
        
    total_pop = sum(n.total_population for n in all_n)
    # Calculate averages, avoiding division by zero
    avg_diabetes = sum(n.diabetes_rate for n in all_n) / len(all_n)
    avg_income = sum(n.median_income for n in all_n) / len(all_n)
    
    return jsonify({
        'total_population': total_pop,
        'neighborhood_count': len(all_n),
        'average_diabetes_rate': round(avg_diabetes, 1),
        'average_income': round(avg_income, 0)
    })

@app.route('/debug-email')
def debug_email():
    import socket
    # Force a timeout after 5 seconds so the server doesn't freeze/crash
    socket.setdefaulttimeout(5)
    
    try:
        sender = app.config.get('MAIL_DEFAULT_SENDER')
        if not sender:
            return "Error: MAIL_USERNAME is not set in config.", 200
            
        msg = Message(
            subject="Debug Test Email",
            sender=sender,
            recipients=['andre.riveraruiz@rutgers.edu']
        )
        msg.body = "If you are reading this, your email configuration is correct!"
        
        # Send immediately
        mail.send(msg)
        return "<h1>SUCCESS! Email sent. Check your inbox/spam.</h1>", 200
        
    except Exception as e:
        # Catch the error and print it to the screen
        return f"<h1>EMAIL FAILED</h1><p>Error details: {str(e)}</p>", 200

@app.route('/api/neighborhood-data')
def get_neighborhood_data():
    """
    Fetches all neighborhood records from the database and returns them as JSON.
    This replaces the hardcoded data in insights.js.
    """
    try:
        # Query all records from the NeighborhoodHealth table
        neighborhoods = NeighborhoodHealth.query.all()
        
        # Convert database objects into a list of dictionaries
        data_list = []
        for n in neighborhoods:
            data_list.append({
                'name': n.name,
                'census_tract': n.census_tract,
                'population': n.total_population,
                'income': n.median_income,
                'poverty': n.poverty_rate,
                'unemployment': n.unemployment_rate,
                'diabetes': n.diabetes_rate,
                'obesity': n.obesity_rate,
                'asthma': n.asthma_rate,
                'mentalDistress': n.mental_distress_rate,
                'high_blood_pressure': n.high_blood_pressure,
                'food_access': n.food_access_score,
                'insurance_lack': n.lack_health_insurance,
                'education': n.high_school_higher,
                'vacant_housing': n.vacant_housing,
                'median_rent': n.median_rent
            })
            
        return jsonify(data_list)
        
    except Exception as e:
        print(f"API Error: {str(e)}", file=sys.stderr)
        return jsonify({"error": "Could not fetch data"}), 500

@app.errorhandler(404)
def not_found_error(error): return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error): db.session.rollback(); return render_template('500.html'), 500