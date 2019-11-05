import json

def handleQueryBatmobile(db):
   batmobiles = []
   for item in db:
      print(str(item))
      if (item['type'] == 'batmobile'):
         batmobiles.append(item)
   return (json.dumps(batmobiles))


# http://localhost:5000/batmobile/query