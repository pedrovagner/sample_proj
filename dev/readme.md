# Development Configuration

```
# Create Python virtual env
virtualenv -p python3 /home/pedro/dev/sample_proj/venv
source /home/pedro/dev/sample_proj/venv/bin/activate

# Install requirements
pip install -r requirements.txt -r dev/requirements.txt

# Create django migrations
python manage.py migrate

# Install JS dependencies
npm install

# Run server
DJANGO_SETTINGS_MODULE=sample_proj.settings_development python manage.py runserver

# Run server with DEBUG = False and Django serve static files
DJANGO_SETTINGS_MODULE=sample_proj.settings_development python manage.py runserver --insecure
```

# Deploy

```npm run deploy```
