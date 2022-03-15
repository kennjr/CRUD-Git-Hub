import urllib.request, json
from .models import Repository

#get ACCESS TOKEN
access_token = None

#get repo base url
search_repo_url = 'https://api.github.com/search/repositories?q={}/in:name'

#get github user base_url

def configure_request(app):
    global access_token
    access_token = app.config['ACCESS_TOKEN']

def serach_repositories(search_term):
    '''
    Function to return json response
    '''
    search_repo_url = 'https://api.github.com/search/repositories?q={}/in:name'

