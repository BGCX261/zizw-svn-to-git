
import logging
from scarlett import model
import datetime

def put(session, kind, jsonBean):
  if not session.user:
    return
  bean = {"user":session.user}
  for key in jsonBean:
    key = str(key)
    if key == "date":
      date = [int(x) for x in jsonBean[key].split("-")]
      date = datetime.date(*tuple(date))
      bean[key] = date
    else:
      bean[key] = jsonBean[key]
  Kind = model.__dict__[kind]
  entity = Kind(**bean)
  entity.put()
  pass

def all(session, kind, sheetId):
  if not session.user:
    return
  Kind = model.__dict__[kind]
  query = Kind.all().filter("sheetId", sheetId)
  for item in query:
    logging.info(item)
  pass
