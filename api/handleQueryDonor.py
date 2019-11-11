import json
def handleQueryDonor(name, db):
   for item in db:
      if (item['type'] == 'donor'):
         if (item['name'] == name):
            return json.dumps(item)
   return '{}'
