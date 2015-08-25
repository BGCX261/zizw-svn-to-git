
from google.appengine.ext import db
import scarlett.model as model

totalKey = "KEY/----------/T/-/a"
totalEntity = model.Matrix(
                     key_name=totalKey,
                     level="T", 
                     value=-1
                     )
totalEntity.put()

for i in [1, 2, 3]:
  year = "200%i" % i
  yearKey = "KEY/%s-01-01/Y/-/a" % year
  yearEntity = model.Matrix(
                            parent=totalEntity,
                            key_name=yearKey,
                            level="Y",
                            value=-1
                            )
  yearEntity.put()
  for j in [1, 2, 3]:
    month = "0%i" % j
    monthKey = "KEY/%s-%s-01/M/-/a" % (year, month)
    monthEntity = model.Matrix(
                               parent=yearEntity,
                               key_name=monthKey,
                               level="M",
                               value=-1
                               )
    monthEntity.put()
    for k in [1, 2, 3]:
      day = "0%i" % k
      dayKey = "KEY/%s-%s-%s/D/-/a" % (year, month, day)
      dayEntity = model.Matrix(
                                 parent=monthEntity,
                                 key_name=dayKey,
                                 level="D",
                                 value=-1
                                 )
      dayEntity.put()
    
    
print "Okay!"
