def handleCheckDonorRegistered(name, db):
   for item in db:
      if (item['type'] == 'donor'):
         if (item['name'] == name):
            return '{"status" : "registered"}'
   return '{"status": "unregistered"}'
