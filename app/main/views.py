
from flask import render_template, redirect, url_for, abort, request, jsonify
from flask_login import login_required, current_user
from app.request import search_repositories, get_repos
from . import main

from .forms import UpdateProfile
#from flask_login import login_required, current_user
from ..models import User, Repository
from .. import db, photos


@main.route('/')
def index():
    message = 'Test'
    search_repos= request.args.get('repo_query')
    repos = get_repos()
    user = current_user
    form = UpdateProfile()

    if search_repos:
      return redirect(url_for('.search', search_term = search_repos))

  
    return render_template('index.html', repos = repos, user = user , form = form)
    

@main.route('/search/<search_term>')
@login_required
def search(search_term):

    '''
    display search results
    '''

    search_term_list = search_term.split(" ") 
    search_term_format = "+".join(search_term_list)
    searched_repos = search_repositories(search_term_format)
    repo_id = Repository.repo_id
    
    return render_template ('search.html', repos = searched_repos)


@main.route('/user/<uname>')
def profile(uname):
    user = User.query.filter_by(username = uname).first()

    if user is None:
        abort(404)

    return render_template("index.html", user = user)

@main.route('/user/<uname>/update',methods = ['GET','POST'])
@login_required
def update_profile(uname):
    user = User.query.filter_by(username = uname).first()
    if user is None:
        abort(404)

    form = UpdateProfile()

    if form.validate_on_submit():
        user.bio = form.bio.data

        db.session.add(user)
        db.session.commit()

        return redirect(url_for('.profile',uname=user.username))

    return render_template('index.html.html',form =form)

@main.route('/user/<uname>/update/pic',methods= ['POST'])
@login_required
def update_pic(uname):
    user = User.query.filter_by(username = uname).first()
    if 'photo' in request.files:
        filename = photos.save(request.files['photo'])
        path = f'photos/{filename}'
        user.profile_pic_path = path
        db.session.commit()
    return redirect(url_for('index.html',uname=uname))



@main.route('/favorite', methods= ['POST'])
def favorite():
    value = request.form.get('savedRepo')
    name = request.form.get('repoName')


    
  
    
    #name = repo.name
    #html_url = repo.html_url
    #language = repo.language
    #language_url = repo.language_url
    #description = repo.description
    #owner = repo.owner
    #repo_id = repo_id

    #fave_repo = Repository(name = name, html_url = html_url, language = language, language_url = language_url, description = description, owner = owner, repo_id=repo_id)

    #favorite_repo = Repository.save_repo(repo)
    print('test', name)
    return render_template('saved.html', repo = value)


@main.route('/test', methods=['GET'])
def test():
  data = {'test': 'test1'}
  return jsonify(data)

@main.route('/users', methods=['GET'])
def get_users():
  all_users = User.query.all()
  
  results = {}
  results['users'] = []
  import json
  for user in all_users:
      curr_user = {
        # 'username' : user.username,
        #             'id':user.id,
        #             'bio':user.bio,
        #             'profile_pic_path':user.profile_pic_path,
        #             'email':user.email,
        #             'pass_secure':user.pass_secure,
        #             'fave_repos':user.fave_repos
                    }
      curr_user['username'] = user.username
      curr_user['id'] = user.id
      curr_user['bio'] = user.bio
      curr_user['profile_pic_path'] = user.profile_pic_path
      curr_user['email'] = user.email
      curr_user['pass_secure'] = user.pass_secure
      #curr_user['fave_repos'] = user.fave_repos
      #results.append(curr_user)
      results['users'].append(curr_user)
  print(results)
  return jsonify(results['users'])

@main.route('/add_user', methods=['POST'])
def create_users():
  user_data = request.get_json()
  new_user = User(username=user_data['username'],email=user_data['email'],bio=user_data['bio'],profile_pic_path=user_data['profile_pic_path'],pass_secure=user_data['pass_secure'],fave_repos=user_data['fave_repos'], id=user_data['id'])

  db.session.add(new_user)
  db.session.commit()
  return jsonify(new_user)
  
      
    
    
