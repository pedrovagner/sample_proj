# Development Configuration

```
# Create Python virtual env
virtualenv -p python3 ~/dev/sample_proj/venv
source ~/dev/sample_proj/venv/bin/activate

# Create the project's settings file
echo "from .settings_development import *" > sample_proj/settings.py

# Install requirements
pip install -r requirements.txt -r dev/requirements.txt

# Create django migrations
python manage.py migrate

# Install JS dependencies
npm install

# Run server
python manage.py runserver

# Run server with DEBUG = False and Django serve static files
python manage.py runserver --insecure
```

# Deploy

```npm run deploy```
