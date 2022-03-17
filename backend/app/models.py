'''Basic User model without a one to many relationship'''
from . import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from . import login_manager

class User(UserMixin, db.Model):
    '''
    User class
    '''
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(255),index = True)
    gh_username = db.Column(db.String(255),index = True)
    email = db.Column(db.String(255),unique = True,index = True)
    #role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    bio = db.Column(db.String(200))
    profile_pic_path = db.Column(db.String())
    pass_secure = db.Column(db.String(255))
    #fave_repos = db.relationship('Repository',backref = 'users',lazy = "dynamic")

  
      
    
    @property
    def password(self):
        raise AttributeError('You cannot read the password attribute')

    @password.setter
    def password(self, password):
        self.pass_secure = generate_password_hash(password)


    def verify_password(self,password):
        return check_password_hash(self.pass_secure,password)


    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    def __repr__(self):
        return f'User {self.username}'



class Repository(db.Model):
    '''
    Repo class from repo request via github API
    '''

    def __init__(self, html_url, description, owner, languages_url, name, url):
        self.html_url = html_url
        self.description = description
        self.owner = owner
        self.languages_url = languages_url
        self.name = name
        self.url = url

    __tablename__ = 'repos'

    id = db.Column(db.Integer,primary_key = True)
    html_url = db.Column(db.String())
    url = db.Column(db.String())
    owner = db.Column(db.String())
    name = db.Column(db.String())
    description = db.Column(db.Text())
    languages_url = db.Column(db.String())
    #user_id = db.Column(db.Integer,db.ForeignKey("users.id"))

    
    def __repr__(self):
        return f'Repository {self.name}'
