from flask import render_template, redirect, url_for, abort, request
from flask_login import login_required
from app.request import search_repositories
from . import main

#from .forms import exampleForm
#from flask_login import login_required, current_user
#from ..models import User
#from .. import db, photos


@main.route('/')
def index():
    message = 'Test'
    search_repos= request.args.get('repo_query')

    if search_repos:
      return redirect(url_for('.search', search_term = search_repos))

  
    return render_template('index.html')
    

@main.route('/search/<search_term>')
#@login_required
def search(search_term):

    '''
    display search results
    '''

    search_term_list = search_term.split(" ") 
    search_term_format = "+".join(search_term_list)
    searched_repos = search_repositories(search_term_format)
    print(searched_repos)
    return render_template ('search.html', repos = searched_repos)

