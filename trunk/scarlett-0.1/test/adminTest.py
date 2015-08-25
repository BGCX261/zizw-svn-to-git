
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

  def testA(self):
    print generateName()
    pass

def generateName():
  import random
  return "_"+str(random.randint(1, 1000000))
