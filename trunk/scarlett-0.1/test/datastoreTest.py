
import unittest
from google.appengine.ext import db
from google.appengine.api import apiproxy_stub_map
from google.appengine.api import datastore_file_stub

DS_PATH = r'c:\temp\dev_ds_tests.db'
HIST_PATH = r'c:\temp\dev_ds_tests.hist'

apiproxy_stub_map.apiproxy.RegisterStub(
                                            'datastore_v3',
                                            datastore_file_stub.DatastoreFileStub(
                                                                                  'ghostnet_tests',
                                                                                  DS_PATH,
                                                                                  HIST_PATH
                                                                                  )
                                            )
class datastoreTest(unittest.TestCase):
  
  def setUp(self):
    pass
  
  def testPut(self):
    pet = Pet()
    pet.name = "aName"
    pet.put()
    
  def testAll(self):
    query = Pet.all()
    pet = query.fetch(1)[0]
    self.assertEquals("aName", pet.name)

class Pet(db.Model):
  name = db.StringProperty()
  
