import datetime
import scarlett.recordService as recordService
import logging
import scarlett.model as model
from google.appengine.ext import db

def getSummary(session, interval, date, tag, sign):
  if not session.user:
    return None
  sum = model.Summary.get(makeKey(session, interval, date, tag, sign))
  if sum:
    return sum.summary
  else:
    return None

def resetSummary(session, interval, date, tag, sign):
  if not session.user:
    return None
  parsedDate = str(date).split("-")
  date = datetime.date(int(parsedDate[0]), int(parsedDate[1]), int(parsedDate[2]))
  sign = int(sign)
  summary = 0
  entityList = recordService.getAllRecordsByCategoryIdAndDate(session, tag, date)
  for entity in entityList:
    if entity["sign"] == sign:
      summary += entity["amount"]
  sum = model.Summary.get(makeKey(session, interval, date, tag, sign))
  if sum:
    sum.summary = summary
  else:
    sum = model.Summary(
                  key_name = str(interval)+str(date)+str(tag)+str(sign),
                  user = session.user,
                  interval = str(interval),
                  date = date,
                  tag = str(tag),
                  sign = sign,
                  summary = summary,
                  parent = session.user
                  )
  sum.put()
  return sum.summary

def deleteSummary(session, interval, date, tag, sign):
  if not session.user:
    return False
  sum = model.Summary.get(makeKey(session, interval, date, tag, sign))
  if sum:
    sum.delete()
  return True

def makeKey(session, interval, date, tag, sign):
  key_name = str(interval)+str(date)+str(tag)+str(sign)
  key = db.Key.from_path("User", session.user.key().name(), "Summary", key_name, _app="scarlett")
  return key
