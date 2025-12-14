import os
import shutil
import pandas as pd
from werkzeug.security import generate_password_hash, check_password_hash
from flask import render_template, request, redirect, url_for, flash, jsonify, session
from app import app, db
from models import Contact, ResourceRequest, Newsletter, NeighborhoodHealth, Admin
from forms import ContactForm, ResourceRequestForm, NewsletterForm

# Configuration
DATA_FILE = 'neighborhood_data.csv'
BACKUP_FILE = 'neighborhood_data.bak'

# SECURITY: Secret key is required for sessions to work.
app.secret_key = os.environ.get('SECRET_KEY', 'replace-this-with-a-secure-key')

# --- HELPER FUNCTIONS ---

def verify_admin(username, password):
    """Securely checks if username exists and password matches the hash."""
    user = Admin.query.filter_by(username=username).first()
    if user and check_password_hash(user.password_hash, password):
        return True
    return False

def reload_database_from_csv():
    """Helper function to clear DB and reload from the current CSV file."""
    try:
        if not os.path.exists(DATA_FILE):
            return False, "Data file not found."

        df = pd.read_csv(DATA_FILE)
        # Normalize columns just to be safe before insertion
        df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')
        
        db.session.query(NeighborhoodHealth).delete()
        
        for _, row in df.iterrows():
            neighborhood = NeighborhoodHealth(
                name=row.get('name', 'Unknown'),
                total_population=row.get('total_population', 0),
                median_income=row.get('median_income', 0),
                poverty_rate=row.get('poverty_rate', 0.0),
                diabetes_rate=row.get('diabetes_rate', 0.0),
                obesity_rate=row.get('obesity_rate', 0.0),
                asthma_rate=row.get('asthma_rate', 0.0),
                mental_distress_rate=row.get('mental_distress_rate', 0.0),
                high_blood_pressure=row.get('high_blood_pressure', 0.0),
                food_access_score=row.get('low_food_access_score', 0.0), # Note: adjusting to common CSV name
                lack_health_insurance=row.get('lack_health_insurance', 0.0)
            )
            db.session.add(neighborhood)
        
        db.session.commit()
        return True, "Database successfully updated."
    except Exception as e:
        db.session.rollback()
        return False, str(e)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

# --- ADMIN ROUTES ---

@app.route('/admin', methods=['GET'])
def admin():
    return render_template('admin.html')

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
    try:
        Admin.__table__.drop(db.engine)
        db.create_all()
        return "Database Admin table reset successfully."
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
        return f"Success! Created admin '{username}'. You can now use these credentials on the Admin page."
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
        # Normalize new data columns immediately
        new_data.columns = new_data.columns.str.strip().str.lower().str.replace(' ', '_')

        if request.form.get('replace_all'):
            new_data.to_csv(DATA_FILE, index=False)
            flash('Full replacement mode: Old data overwritten.', 'info')
        else:
            if os.path.exists(DATA_FILE):
                current_data = pd.read_csv(DATA_FILE)
                
                # --- BUG FIX: Normalize EXISTING data columns too ---
                current_data.columns = current_data.columns.str.strip().str.lower().str.replace(' ', '_')
                
                if 'name' not in new_data.columns or 'name' not in current_data.columns:
                    flash('Error: CSV must contain a "name" column for merging.', 'danger')
                    return redirect(url_for('admin'))

                current_data.set_index('name', inplace=True)
                new_data.set_index('name', inplace=True)
                
                # Combine: Update existing with new, keep existing where new is missing
                merged_data = new_data.combine_first(current_data).reset_index()
                
                merged_data.to_csv(DATA_FILE, index=False)
                flash('Smart Merge: New data integrated with existing records.', 'info')
            else:
                new_data.to_csv(DATA_FILE, index=False)

        success, msg = reload_database_from_csv()
        if success:
            flash(f'Success! {msg}', 'success')
        else:
            flash(f'Error updating database: {msg}', 'danger')

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
                flash('System rolled back to previous version successfully.', 'success')
            else:
                flash(f'File restored but DB update failed: {msg}', 'warning')
        else:
            flash('No backup file found to restore.', 'warning')
    except Exception as e:
        flash(f'Rollback failed: {str(e)}', 'danger')

    return redirect(url_for('admin'))

# --- DASHBOARD & OTHER ROUTES ---

@app.route('/dashboard')
def dashboard():
    all_neighborhoods = NeighborhoodHealth.query.all()
    
    if not all_neighborhoods:
        return render_template('dashboard.html', 
                               total_population="0", neighborhood_count=0,
                               min_diabetes=0, max_diabetes=0, diabetes_gap=0,
                               min_income=0, max_income=0, income_ratio=0,
                               min_poverty=0, max_poverty=0, poverty_gap=0,
                               dashboard_data=[])

    total_population = sum(n.total_population for n in all_neighborhoods)
    
    diabetes_rates = [n.diabetes_rate for n in all_neighborhoods]
    min_diabetes = min(diabetes_rates) if diabetes_rates else 0
    max_diabetes = max(diabetes_rates) if diabetes_rates else 0
    diabetes_gap = round(max_diabetes - min_diabetes, 1)

    incomes = [n.median_income for n in all_neighborhoods]
    min_income = min(incomes) if incomes else 0
    max_income = max(incomes) if incomes else 0
    income_ratio = round(max_income / min_income, 1) if min_income > 0 else 0

    poverty_rates = [n.poverty_rate for n in all_neighborhoods]
    min_poverty = min(poverty_rates) if poverty_rates else 0
    max_poverty = max(poverty_rates) if poverty_rates else 0
    poverty_gap = round(max_poverty - min_poverty, 1)

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
    
    if not all_n:
        return render_template('insights.html', total_population="0", insights_data=[])

    total_population = sum(n.total_population for n in all_n)
    
    diabetes_rates = [n.diabetes_rate for n in all_n]
    avg_diabetes = sum(diabetes_rates) / len(diabetes_rates) if diabetes_rates else 0
    min_diabetes = min(diabetes_rates) if diabetes_rates else 0
    max_diabetes = max(diabetes_rates) if diabetes_rates else 0

    incomes = [n.median_income for n in all_n]
    avg_income = sum(incomes) / len(incomes) if incomes else 0
    min_income = min(incomes) if incomes else 0
    max_income = max(incomes) if incomes else 0

    poverty_rates = [n.poverty_rate for n in all_n]
    avg_poverty = sum(poverty_rates) / len(poverty_rates) if poverty_rates else 0
    min_poverty = min(poverty_rates) if poverty_rates else 0
    max_poverty = max(poverty_rates) if poverty_rates else 0

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
            'insurance': getattr(n, 'lack_health_insurance', 0)
        })

    return render_template('insights.html',
                           total_population=f"{total_population:,}",
                           neighborhood_count=len(all_n),
                           avg_diabetes=f"{avg_diabetes:.1f}",
                           min_diabetes=min_diabetes,
                           max_diabetes=max_diabetes,
                           avg_income=f"{avg_income:,.0f}",
                           min_income=f"{min_income:,.0f}",
                           max_income=f"{max_income:,.0f}",
                           avg_poverty=f"{avg_poverty:.1f}",
                           min_poverty=min_poverty,
                           max_poverty=max_poverty,
                           highest_income_n=highest_income_n,
                           highest_poverty_n=highest_poverty_n,
                           insights_data=insights_data)

@app.route('/neighborhoods')
def neighborhoods():
    all_n = NeighborhoodHealth.query.all()
    
    neighborhood_data = []
    for n in all_n:
        neighborhood_data.append({
            'id': n.id,
            'name': n.name,
            'population': n.total_population,
            'income': n.median_income,
            'poverty': n.poverty_rate,
            'diabetes': n.diabetes_rate,
            'equity_status': 'High Priority' if n.median_income < 30000 else 'Stable' if n.median_income > 50000 else 'Vulnerable'
        })
    
    return render_template('neighborhoods.html', neighborhood_data=neighborhood_data)

@app.route('/rankings')
def rankings():
    all_n = NeighborhoodHealth.query.all()
    
    rankings_data = []
    for n in all_n:
        rankings_data.append({
            'name': n.name,
            'population': n.total_population,
            'income': n.median_income,
            'poverty': n.poverty_rate,
            'diabetes': n.diabetes_rate
        })
        
    return render_template('rankings.html', rankings_data=rankings_data)

@app.route('/policy')
def policy():
    return render_template('policy.html')

@app.route('/resources', methods=['GET', 'POST'])
def resources():
    contact_form = ContactForm()
    resource_form = ResourceRequestForm()
    newsletter_form = NewsletterForm()
    
    if request.method == 'POST':
        if 'contact_submit' in request.form or 'organization' in request.form:
            if contact_form.validate_on_submit():
                contact = Contact(
                    name=contact_form.name.data,
                    email=contact_form.email.data,
                    organization=contact_form.organization.data,
                    message=contact_form.message.data
                )
                db.session.add(contact)
                db.session.commit()
                flash('Your message has been sent successfully!', 'success')
                return redirect(url_for('resources'))
        
        elif 'resource_submit' in request.form or 'zip_code' in request.form:
            if resource_form.validate_on_submit():
                resource_request = ResourceRequest(
                    name=resource_form.name.data,
                    email=resource_form.email.data,
                    zip_code=resource_form.zip_code.data,
                    resource_type=resource_form.resource_type.data,
                    needs_description=resource_form.needs_description.data
                )
                db.session.add(resource_request)
                db.session.commit()
                flash('Your resource request has been submitted successfully!', 'success')
                return redirect(url_for('resources'))
        
        elif 'newsletter_submit' in request.form:
            if newsletter_form.validate_on_submit():
                existing_subscriber = Newsletter.query.filter_by(email=newsletter_form.email.data).first()
                if not existing_subscriber:
                    newsletter = Newsletter(email=newsletter_form.email.data)
                    db.session.add(newsletter)
                    db.session.commit()
                    flash('Successfully subscribed to our newsletter!', 'success')
                else:
                    flash('You are already subscribed to our newsletter.', 'info')
                return redirect(url_for('resources'))
    
    return render_template('resources.html', 
                         contact_form=contact_form,
                         resource_form=resource_form,
                         newsletter_form=newsletter_form)

@app.route('/api/neighborhoods')
def api_neighborhoods():
    return jsonify({'error': 'No data available yet', 'message': 'Placeholder'})

@app.route('/api/health-metrics')
def api_health_metrics():
    return jsonify({'error': 'No data available yet', 'message': 'Placeholder'})

@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return render_template('500.html'), 500