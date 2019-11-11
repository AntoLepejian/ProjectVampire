#This Function should add the username to the database of people from which we can potentially collect blood
import datetime

def handleRegisterDonor(name, bloodtype, db):
   for item in db:
      if (item['type'] == 'donor'):
         if (item['name'] == name):
            return '{"value" : "fail"}', db

   # 0 is seconds from epoch
   db.append({'type': 'donor', 'name': name, 'bloodtype': bloodtype, 'last_collected': 0})
   return '{ "value": "success" }', db


#http://localhost:5000/donor/register?name=anto&bloodtype=A+