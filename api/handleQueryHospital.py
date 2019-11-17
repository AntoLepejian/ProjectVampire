import json

def handleQueryHospital(name, db):
   for item in db:
      print(str(item))
      if (item['type'] == 'hospital'):
         if (item['name'] == name):
            return json.dumps(item)
   return "{}"


# http://localhost:5000/batmobile/query?carid=car649