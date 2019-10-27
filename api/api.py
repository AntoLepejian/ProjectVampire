import sys

import flask
from flask import request
from handleBloodRequest import handleBloodRequest
from handleRegisterDonor import handleRegisterDonor
from handleCollectBlood import handleCollectBlood

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/', methods=['GET'])
def home():
    return "Working"

# This will be called by hospitals. 
# Could be changed to POST, but doesn't really matter
@app.route('/requestblood', methods=['GET'])
def blood_request():
   if ('amount' in request.args):
      amount = int(request.args['amount'])
   else:
      return "Error: No 'Amount' field provided. Please specify amount"
   if ('hospital' in request.args):
      hospital = str(request.args['hospital'])
   else:
      return "Error: No 'hospital' field provided. Please specify hospital name"
   if ('bloodtype' in request.args):
      bloodtype = str(request.args['bloodtype'])
   else:
      return "Error: No 'bloodtype' field provided"

   response = handleBloodRequest(amount, hospital, bloodtype)
   return response


#This will be called by potential blood donors to register themselves in the database
@app.route('/registerdonor', methods=['GET'])
def register_donor():
   if ('name' in request.args):
      name = str(request.args['name'])
   else:
      return "Error: Missing 'name'"
   if ('bloodtype' in request.args):
      bloodtype = str(request.args['bloodtype'])
   else:
      return "Error: Missing 'bloodtype'"
   response = handleRegisterDonor(name, bloodtype)
   return response


#This will be called by the batmobile to signal initiation of a collection tour for a specific bloodtype
@app.route('/collectblood', methods=['GET'])
def collect_blood():
   if ('bloodtype' in request.args):
      bloodtype = str(request.args['bloodtype'])
   else:
      return "Error: Missing 'bloodtype'"

   response = handleCollectBlood(bloodtype)
   return response

app.run()
