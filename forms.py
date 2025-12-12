from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, SubmitField
from wtforms.validators import DataRequired, Email, Length

class ContactForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(min=2, max=100)])
    email = StringField('Email', validators=[DataRequired(), Email()])
    organization = StringField('Organization', validators=[Length(max=200)])
    message = TextAreaField('Message', validators=[DataRequired(), Length(min=10, max=1000)])
    submit = SubmitField('Send Message')

class ResourceRequestForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(min=2, max=100)])
    email = StringField('Email', validators=[DataRequired(), Email()])
    zip_code = StringField('ZIP Code', validators=[Length(max=10)])
    resource_type = SelectField('Resource Type', choices=[
        ('', 'Select a resource type'),
        ('healthcare', 'Healthcare Services'),
        ('food', 'Food Access'),
        ('housing', 'Housing Assistance'),
        ('mental_health', 'Mental Health Support'),
        ('education', 'Educational Resources'),
        ('transportation', 'Transportation'),
        ('employment', 'Employment Services'),
        ('other', 'Other')
    ], validators=[DataRequired()])
    needs_description = TextAreaField('Describe Your Needs', validators=[Length(max=500)])
    submit = SubmitField('Submit Request')

class NewsletterForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    submit = SubmitField('Subscribe')
