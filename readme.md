# Sample Project

This is a Django project composed with the following applications:

* [Website](app/website/readme.md)
* [Credit Card Validator](app/credit_card/readme.md)

Requires Python 3.

# Development

```
# Install requirements
pip install -r requirements.txt

# Create django migrations
python manage.py migrate

# Install JS dependencies
bower install

# Run server
DJANGO_SETTINGS_MODULE=sample_proj.settings_development python manage.py runserver
```
