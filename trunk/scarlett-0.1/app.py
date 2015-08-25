
import logging
import webob
import wsgiref.handlers
import simplejson.encoder
import simplejson.decoder
from google.appengine.ext import db
from google.appengine.api import users
from scarlett import model
from scarlett import utils

jsonEncoder = simplejson.encoder.JSONEncoder()
jsonDecoder = simplejson.decoder.JSONDecoder()

def scarlett(environ, start_response):
  #
  #  create request & response objects
  #
  request = webob.Request(environ)
  response = webob.Response()
  #
  #  create session object
  #
  session = Session(request)
  #  do job
  channel = session.message["channel"]
  if channel == "refresh":
    if session.isAdmin:
      response.body = shell % ("Scarlett-Admin", "scarlett.Admin")
    elif session.user:
      response.body = shell % ("Scarlett", "scarlett.Main")
    else:
      response.body = shell % ("Login", "scarlett.Login")
  elif channel == "locateservice":
    fullName = str(session.message["fullName"])
    service = utils.my_import(fullName)
    simpleName = fullName.split('.')[-1]
    response.body = generateServiceStub(service, fullName, simpleName)
    response.content_type = "text/plain"
    response.charset = "UTF-8"
  elif channel == "rmi":
    fullName = str(session.message["serviceName"])
    methodName = str(session.message["methodName"])
    args = session.message["args"];
    argList = ""
    for i in range(len(args)):
      argList += "args[%s], " % i
    argList = argList[:-2]
    service = utils.my_import(fullName)
    outMessage = {
              "result": eval("service."+methodName+"(session, "+argList+")")
              }
    if fullName == "scarlett.admin" and methodName == "login" and outMessage["result"]:
      response.set_cookie("sid", userToSid(args[0]))
    response.body = jsonEncoder.encode(outMessage)
    response.content_type = "text/plain"
    response.charset = "UTF-8"
  elif channel == "admin":
    user = users.get_current_user()
    if not user:
      response.body = users.create_login_url("/")
      logging.info("admin: do login")
    else: 
      response.body = "/"
      logging.info("admin: do normal")
  else:
    response.body = "unknown channel: %s" % str(channel)
  #
  return response(environ, start_response)

#
#  Tips:
#    session.message
#    session.message.channel
#    session.isAdmin
#    session.user
#    session.user.alias
#
class Session():
  def __init__(self, request):
    #
    #  setting message 
    #
    if request.method == "GET":
      self.message = {"channel":"refresh"}
    else:
      self.message = jsonDecoder.decode(request.body)
    #
    # setting isAdmin & user  
    #
    if users.is_current_user_admin():
      self.isAdmin = True
      self.user = None
    elif "sid" not in request.cookies:
      self.isAdmin = False
      self.user = None
    elif not request.cookies["sid"]:
      self.isAdmin = False
      self.user = None
    else:
      self.isAdmin = False
      self.user = sidToUser(request.cookies["sid"])

def sidToUser(sid):
  #
  #  TODO: a real sid should be used
  #
  return model.User.get(db.Key.from_path("User", "ID_"+sid, _app="scarlett"))

def userToSid(userName):
  #
  #  TODO: a real sid should be used
  #
  return userName

def generateServiceStub(service, fullName, simpleName):
  methodList= filter(lambda x : x[0:1]!= "_", dir(service))
  stub = "var " + simpleName + " = function(){\n"
  stub += "}\n\n"
  for method in methodList:
    stub += simpleName + ".prototype." + method + " = function() {\n"
    stub += "\treturn jsloader.doRmi('%s', '%s', arguments);\n" % (fullName, method)
    stub += "};\n"
  return stub

def main():
  wsgiref.handlers.CGIHandler().run(scarlett)

shell = """
<html>
  <head>
    <title>%s</title>
    <script>
      var App = null;
      var app = null;
      function init() {
        App = jsloader.resolve("%s")
        app = new App(document.body);
        var welcome = document.getElementById("welcome");
        document.body.removeChild(welcome);
      }
      function destroy() {
        app.destroy();
      }
    </script>
  </head>
  <body scroll="no" style="overflow: hidden; margin: 0px; padding: 0px" onload="init()" onunload="destroy()">
    <span id="welcome">Loading ...</span>
  </body>
  <script src="js/lang/JSLoader.js"></script>
</html>
"""

if __name__ == "__main__":
  main()
