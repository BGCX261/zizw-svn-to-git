
from google.appengine.ext import db
import scarlett.model as model

def printEntity(entity):
  print "%s = %s, %i" % (entity.key().name(), entity.level, entity.value)

totalKey = db.Key.from_path("Matrix", "KEY/----------/T/-/a")
totalEntity = db.get(totalKey)

printEntity(totalEntity)

query = model.Matrix.gql(
                         "where level = :level and ancestor is :parent",
                         level=u"Y",
                         parent=totalKey)
for yearEntity in query:
  printEntity(yearEntity)

print "totalViewer!"
