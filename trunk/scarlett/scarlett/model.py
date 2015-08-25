
from google.appengine.ext import db

class User(db.Model):
  alias = db.StringProperty()
  password = db.StringProperty(default="")

class Record(db.Model):
  user = db.ReferenceProperty(required=True)
  date = db.DateProperty(required=True)
  desc = db.StringProperty(required=True)
  amount = db.IntegerProperty(required=True)
  sign = db.IntegerProperty(required=True)
  category = db.StringProperty(required=True)

class Matrix(db.Model):
  level = db.StringProperty(required=True)
  value = db.IntegerProperty(required=True)
