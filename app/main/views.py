from flask import render_template, request, redirect, url_for, abort
from . import main
#from .forms import exampleForm
#from flask_login import login_required, current_user
#from ..models import User
#from .. import db, photos


@main.route('/')
def index():
    message = 'Test'
    return render_template('index.html', message=message)

