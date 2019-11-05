import json
def handleQueryDonor(db):
   donors = []
   for item in db:
      print(str(item))
      if (item['type'] == 'donor'):
         donors.append(item)
   return json.dumps(donors)
