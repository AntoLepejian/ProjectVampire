def handleCheckHospitalRegistered(name, db):
   for item in db:
      if (item['type'] == 'hospital'):
         if (item['name'] == name):
            return '{"status" : "registered"}'
   return '{"status": "unregistered"}'
