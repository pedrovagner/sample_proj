# Sample Project

This is a `Django` project composed with the following applications:

* [Website](app/website/readme.md)
* [Credit Card Validator](app/credit_card/readme.md)

## Notes

Most of the `TypeScript` code in this project is used only in the deployment process.

# Development

Requires `Python 3`, `node 6.x`, `npm 3.x` and `bower`.

```
# Create the project's settings file
echo "from .settings_development import *" > sample_proj/settings.py

# Install requirements
pip install -r requirements.txt

# Create django migrations
python manage.py migrate

# Install JS dependencies
npm install

# Run server
python manage.py runserver
```

# Running Tests

Running all tests: 

```python manage.py test website credit_card```

# Deploy

[Raspberry Pi PC deploy](dev/readme.md)
