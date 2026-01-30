import os
import shutil
import pandas as pd
from werkzeug.security import generate_password_hash, check_password_hash
from flask import render_template, request, redirect, url_for, flash, jsonify, session
from app import app, db
from models import Contact, ResourceRequest, Newsletter, NeighborhoodHealth, Admin
from forms import ContactForm, ResourceRequestForm, NewsletterForm
from sqlalchemy.exc import SQLAlchemyError # Import to catch DB specific errors

# Configuration
DATA_FILE = 'neighborhood_data.csv'
BACKUP_FILE = 'neighborhood_data.bak'

# SECURITY
app.secret_key = os.environ.get('SECRET_KEY', 'replace-this-with-a-secure-key')

# --- HELPER FUNCTIONS ---

def verify_admin(username, password):
    user = Admin.query.filter_by(username=username).first()
    if user and check_password_hash(user.password_hash, password):
        return True
    return False

def clean_dataframe_columns(df):
    """
    Standardizes column names and maps common variations to database keys.
    """
    # 1. Basic cleaning: lowercase, underscore, strip spaces, remove symbols
    df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_').str.replace('%', '').str.replace('$', '')
    
    # 2. FLEXIBLE MAPPING (The Translator)
    column_map = {
        'neighborhood': 'name',
        'neighborhood_name': 'name',
        'total_pop': 'total_population',
        'population': 'total_population',
        'income': 'median_income',
        'median_household_income': 'median_income',
        'poverty': 'poverty_rate',
        'diabetes': 'diabetes_rate',
        'obesity': 'obesity_rate',
        'asthma': 'asthma_rate',
        'mental_distress': 'mental_distress_rate',
        'food_access': 'food_access_score',
        'insurance': 'lack_health_insurance',
        'uninsured': 'lack_health_insurance'
    }
    
    # Rename columns if they match our map
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
    try:
        if not os.path.exists(DATA_FILE):
            return False, "Data file not found."

        df = pd.read_csv(DATA_FILE)
        df = clean_dataframe_columns(df) 
        
        # FINAL SANITY CHECK: Replace any remaining NaNs across the whole DataFrame with 0
        df = df.fillna(0) 

        db.session.query(NeighborhoodHealth).delete()
        
        for _, row in df.iterrows():
            neighborhood = NeighborhoodHealth(
                name=row.get('name', 'Unknown'),
                total_population=clean_numeric(row.get('total_population', 0)),
                median_income=clean_numeric(row.get('median_income', 0)),
                poverty_rate=clean_numeric(row.get('poverty_rate', 0.0)),
                diabetes_rate=clean_numeric(row.get('diabetes_rate', 0.0)),
                obesity_rate=clean_numeric(row.get('obesity_rate', 0.0)),
                asthma_rate=clean_numeric(row.get('asthma_rate', 0.0)),
                mental_distress_rate=clean_numeric(row.get('mental_distress_rate', 0.0)),
                high_blood_pressure=clean_numeric(row.get('high_blood_pressure', 0.0)),
                food_access_score=clean_numeric(row.get('food_access_score', 0.0)),
                lack_health_insurance=clean_numeric(row.get('lack_health_insurance', 0.0))
            )
            db.session.add(neighborhood)
        
        db.session.commit()
        return True, "Database successfully updated."
    except SQLAlchemyError as e:
        db.session.rollback()
        # Report the specific SQL error for better debugging
        return False, f"Database Error: Could not insert data. {e.__cause__}"
    except Exception as e:
        db.session.rollback()
        # Report a generic error
        return False, f"Critical Python Error during reload: {str(e)}"

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
    """Run this ONCE to force the live database to adopt new column sizes."""
    try:
        Admin.__table__.drop(db.engine)
        NeighborhoodHealth.__table__.drop(db.engine) # Also drop the Neighborhood table to fix column type
        db.create_all()
        return "SUCCESS: All data tables reset and recreated with correct types. You must recreate your admin user now."
    except Exception as e:
        return f"Error resetting table: {str(e)}"

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

    # CRITICAL CHANGE: Prepare Data for the Interactive Chart
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
            'insurance': getattr(n, 'lack_health_insurance', 0)
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
        # 1. Handle Contact Form
        if 'contact_submit' in request.form:
            if contact_form.validate_on_submit():
                try:
                    # IMPORTANT: Verify 'organization' vs 'subject' in your models.py
                    new_msg = Contact(
                        name=contact_form.name.data, 
                        email=contact_form.email.data, 
                        organization=contact_form.organization.data, 
                        message=contact_form.message.data
                    )
                    db.session.add(new_msg)
                    db.session.commit()
                    flash('Message sent successfully!', 'success')
                    return redirect(url_for('resources'))
                except Exception as e:
                    db.session.rollback()
                    flash(f'Database Error: {str(e)}', 'danger')
            else:
                # THIS IS THE FIX: It will now tell you WHY it failed
                flash(f'Error: {contact_form.errors}', 'danger')

        # 2. Handle Newsletter
        elif 'newsletter_submit' in request.form:
            if newsletter_form.validate_on_submit():
                # Check for duplicates to prevent errors
                if not Newsletter.query.filter_by(email=newsletter_form.email.data).first():
                    db.session.add(Newsletter(email=newsletter_form.email.data))
                    db.session.commit()
                    flash('Subscribed!', 'success')
                else:
                    flash('Already subscribed.', 'info')
                return redirect(url_for('resources'))
            else:
                flash(f'Newsletter Error: {newsletter_form.errors}', 'danger')

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

@app.errorhandler(404)
def not_found_error(error): return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error): db.session.rollback(); return render_template('500.html'), 500