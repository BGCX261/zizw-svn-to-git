
import logging
from scarlett import model
from google.appengine.ext import db
from scarlett.model import User

def createUser(session, keyName, alias, password):
  if not session.isAdmin:
    return False
  user = model.User(key_name="ID_"+keyName)
  user.alias = alias
  user.password = password
  user.put()
  return True

def login(session, username, password, *args):
  if session.isAdmin or session.user:
    return False
  username = "ID_" + username
  key = db.Key.from_path("User", username, _app="scarlett")
  user = User.get(key)
  if not user:
    return False
  elif user.password == password:
    return True
  else:
    return False
