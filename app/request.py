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

def search_repositories(search_term):
    '''
    Function to return json response
    '''
    search_repo_url = 'https://api.github.com/search/repositories?q={}/in:name'.format(search_term)
    with urllib.request.urlopen(search_repo_url) as url:
        search_repo_data = url.read()
        search_repo_response = json.loads(search_repo_data)

        search_repo_results = None

        if search_repo_response['items']:
            search_repo_list = search_repo_response['items']
            search_repo_results = process_results(search_repo_list)

    return search_repo_results

def process_results(search_repo_list):
    '''
    process repo results
    '''

    search_results = []
    for repo_item in search_repo_list:
        html_url = repo_item.get('html_url')
        owner = repo_item.get('owner.login')
        description = repo_item.get('description')
        language = repo_item.get('language')
        language_url = repo_item.get('languages_url')
        name = repo_item.get('name')

        if html_url:
            repo_object = Repository(html_url, description, owner, language, language_url, name)
            search_results.append(repo_object)
    #print(repo_object.description)
    print(repo_object.description)
    return search_results

def get_repos():
    base_url = 'https://api.github.com/repositories'
    get_repos_url = 'https://api.github.com/repositories'.format()

    with urllib.request.urlopen(get_repos_url) as url:
        trending_repo_data = url.read()
        trending_repo_response = json.loads(trending_repo_data)

        trending_results = None

        #if trending_repo_response:
        #html_url = trending_repo_response.get('html_url')
        #owner = trending_repo_response.get('owner.login')
        #description = trending_repo_response.get('description')
        #language = trending_repo_response.get('language')
        #language_url = trending_repo_response.get('languages_url')
        #name = trending_repo_response.get('name')

        trending_results_list = trending_repo_response
        trending_results = process_results(trending_results_list)

        #repo_object = Repository(html_url, description, owner, language, language_url, name)
    
    return trending_results


