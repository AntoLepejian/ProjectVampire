import sys

import flask
from flask import request
from tinydb import TinyDB
from flask_cors import CORS


from handleBloodRequest import handleBloodRequest
from handleRegisterDonor import handleRegisterDonor
from handleCollectBlood import handleCollectBlood
from handleScreenBlood import handleScreenBlood
from handleDeregisterDonor import handleDeregisterDonor
from handleQueryDonor import handleQueryDonor
from handleRegisterBatmobile import handleRegisterBatmobile
from handleQueryBatmobile import handleQueryBatmobile
from handleCheckDonorRegistered import handleCheckDonorRegistered
from handleCheckBatmobileRegistered import handleCheckBatmobileRegistered
from handleRegisterHospital import handleRegisterHospital
from handleCheckHospitalRegistered import handleCheckHospitalRegistered
from handleQueryHospital import handleQueryHospital


app = flask.Flask(__name__)
app.config["DEBUG"] = True
cors = CORS(app)

# cors = CORS(app, resources={r"/foo": {"origins": "*"}})
# app.config['CORS_HEADERS'] = 'Content-Type'

# @cross_origin(origin='*',headers=['Content-Type','Authorization'])


@app.route('/', methods=['GET'])
def home():
   return "Working"

# This will be called by hospitals. 
# Could be changed to POST, but doesn't really matter
# TODO
@app.route('/blood/request', methods=['GET'])
def blood_request():
   if ('amount' in request.args):
      amount = int(request.args['amount'])
   else:
      return '{ "value": "failed", "msg": "Missing amount" }'
   if ('name' in request.args):
      hospital = str(request.args['name'])
   else:
      return '{ "value": "failed", "msg": "Missing hospital name" }'
   if ('bloodtype' in request.args):
      bloodtype = str(request.args['bloodtype'])
   else:
      return '{ "value": "failed", "msg": "Missing bloodtype" }'

   response, updatedDB = handleBloodRequest(amount, hospital, bloodtype, dbjson)
   updatePersistantDatabase(updatedDB)
   return response


# This will be called by potential blood donors to register themselves in the database
# INFO: Compeleted by Rez
@app.route('/donor/register', methods=['GET'])
def register_donor():
   #These checks ensure that the API call has correct query parameters
   if ('name' in request.args):
      name = str(request.args['name'])
   else:
      return '{ "value": "failed", "msg": "Missing name" }'
   if ('bloodtype' in request.args):
      bloodtype = str(request.args['bloodtype'])
   else:
      return '{ "value": "failed", "msg": "Missing bloodtype" }'
   #Here we call the function and pass it argument 'dbjson', where dbjson is just a list format of the database
   response, updatedDB = handleRegisterDonor(name, bloodtype, dbjson)
   #The function returns an updatedDB. This is the database after changes have been made, we call updatePersistantDatabase
   #to update the local json file for persistance
   updatePersistantDatabase(updatedDB)
   return response
   

# This will result all the blood donors
# INFO: Completed by rez
@app.route('/donor/query', methods=['GET'])
def query_donor():
   if ('name' in request.args):
      name = str(request.args['name'])
   else:
      return '{ "value": "failed", "msg": "Missing name" }'
   response = handleQueryDonor(name, dbjson)
   return response

#This will be called by the donor to deregister themselves from the database
# INFO : Completed by rez
@app.route('/donor/deregister', methods=['GET'])
def deregister_donor():
   if ('name' in request.args):
      name = str(request.args['name'])
   else:
      return '{ "value": "failed", "msg": "Missing name" }'
   response, updatedDB = handleDeregisterDonor(name, dbjson)
   updatePersistantDatabase(updatedDB)
   return response
# This will be called by the frontend to check if a donor is registered or unregistered
@app.route('/donor/checkregistered', methods=['GET'])
def check_donor_registered():
   if ('name' in request.args):
      name = str(request.args['name'])
   else:
      return '{ "value": "failed", "msg": "Missing name" }'
   response = handleCheckDonorRegistered(name, dbjson)
   return response

# This will be called bhy the frontend to check is batmobile is registred or unregistered
@app.route('/batmobile/checkregistered', methods=['GET'])
def check_batmobile_registered():
   if ('carid' in request.args):
      carid = str(request.args['carid'])
   else: 
      return '{ "value": "failed", "msg": "Missing carid" }'
   response = handleCheckBatmobileRegistered(carid, dbjson)
   return response

@app.route('/hospital/checkregistered', methods=['GET'])
def check_hospital_registered():
   if ('name' in request.args):
      hosp_name = str(request.args['name'])
   else:
      return '{ "value": "failed", "msg": "Missing name"}'
   response = handleCheckHospitalRegistered(hosp_name, dbjson)
   return response
      


#This will be called by the batmobile to signal initiation of a collection tour for a specific bloodtype
# INFO: Completed by rez
@app.route('/blood/collect', methods=['GET'])
def collect_blood():
   if ('bloodtype' in request.args):
      bloodtype = str(request.args['bloodtype'])
   else:
      return '{ "value": "failed", "msg": "Missing bloodtype"}'
   if ('carid' in request.args):
      carid = str(request.args['carid'])
   else:
      return '{ "value": "failed", "msg": "Missing carid" }'
   if ('amount' in request.args):
      amount = str(request.args['amount'])

   response, updatedDB = handleCollectBlood(carid, bloodtype, amount, dbjson)
   updatePersistantDatabase(updatedDB)
   return response

#This will be called by the batmobile to screen all the blood it has
@app.route('/blood/screen', methods=['GET'])
def screen_blood():
   if ('carid' in request.args):
      carid = str(request.args['carid'])
   else: 
      return '{ "value": "failed", "msg": "Missing carid" }'

   response, updatedDB = handleScreenBlood(carid, dbjson)
   updatePersistantDatabase(updatedDB)
   return response

# Will return all batmobiles and their contents
# INFO: Completed by rez
@app.route('/batmobile/query', methods=['GET'])
def query_car():
   if ('carid' in request.args):
      carid = str(request.args['carid'])
   else: 
      return '{ "value": "failed", "msg": "Missing carid" }'
   response = handleQueryBatmobile(carid, dbjson)
   return response

@app.route('/hospital/query', methods=['GET'])
def query_hospital():
   if ('name' in request.args):
      hosp_name = str(request.args['name'])
   else:
      return '{ "value": "failed", "msg": "Missing name" }'
   response = handleQueryHospital(hosp_name, dbjson)
   return response

# Will Register batmobile and initialise batmobile inventory
# INFO: Completed by rez
@app.route('/batmobile/register', methods=['GET'])
def register_car():
   if ('carid' in request.args):
      carid = str(request.args['carid'])
   else: 
      return '{ "value": "failed", "msg": "Missing carid" }'
   response, updatedDB = handleRegisterBatmobile(carid, dbjson)
   updatePersistantDatabase(updatedDB)
   return response

@app.route('/hospital/register', methods=['GET'])
def register_hospital():
   if ('name' in request.args):
      hosp_name = str(request.args['name'])
   else:
      return '{ "value": "failed", "msg": "Missing Hospital name" }'
   response, updatedDB = handleRegisterHospital(hosp_name, dbjson)
   updatePersistantDatabase(updatedDB)
   return response




# DO NOT TOUCH: This is just a helper function that updates the database.
# If you create a function with side effects that change the database, make sure you call this
def updatePersistantDatabase(newdb):
   if (db != None):
      db.purge()
   for item in newdb:
      db.insert(item)

f = open("database.json", "a+")
f.close()
db = TinyDB('database.json')
dbjson = db.all()
app.run()