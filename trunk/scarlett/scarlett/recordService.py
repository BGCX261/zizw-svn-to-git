
import logging
import datetime
import scarlett.model as model
from google.appengine.ext import db

def createRecord(session, record):
  if not session.user:
    return False
  parsedDate = record["date"].split("-")
  date = datetime.date(int(parsedDate[0]), int(parsedDate[1]), int(parsedDate[2]))
  desc = record["desc"]
  amount = int(record["amount"])
  sign = int(record["sign"])
  category = str(record["category"])
  entity = model.Record(
                        user = session.user,
                        date = date,
                        desc = desc,
                        amount = amount,
                        sign = sign,
                        category = category,
                        parent = session.user
                        )
  entity.put()
  return True
    
def getAllRecordsByCategoryIdAndDate(session, categoryId, date):
  if not session.user:
    return None
  parsedDate = str(date).split("-")
  date = datetime.datetime(int(parsedDate[0]), int(parsedDate[1]), int(parsedDate[2]))
  result = []
  query = model.Record.gql(
                           "where category = :category and date = :date and ancestor is :user",
                           user=session.user, 
                           category=categoryId,
                           date=date)
  
  for entity in query:
    date = "%s-%s-%s" % (entity.date.year, entity.date.month<10 and "0"+str(entity.date.month) or entity.date.month, entity.date.day)
    record = {
              "date": date,
              "desc": entity.desc,
              "amount": entity.amount,
              "sign": entity.sign,
              "category": entity.category
              }
    result.append(record)
  return result
  
  