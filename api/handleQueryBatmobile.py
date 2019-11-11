import json

def handleQueryBatmobile(carid, db):
   for item in db:
      print(str(item))
      if (item['type'] == 'batmobile'):
         if (item['carid'] == carid):
            return json.dumps(item)
   return "{}"


# http://localhost:5000/batmobile/query