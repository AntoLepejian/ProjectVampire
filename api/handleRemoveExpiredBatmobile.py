import datetime

def handleRemoveExpiredBatmobile(carid, db):
   # Check if Registered already
   car = None
   for item in db:
      if (item['type'] == 'batmobile'):
         if (item['carid'] == carid):
            car = item
            break

   if car == None:
      return '{ "value": "failed", "msg": "hospital is not registered" }', db
                                                                             
   bloodtypes = ['A+', 'A-', 'O+', 'O-', 'B+', 'B-', 'AB+', 'AB-']
   currentTime = int(datetime.datetime.now().timestamp())

   for bloodtype in bloodtypes:
      unscreenedbags = car['blood_'+bloodtype]['unscreened']
      for bag in unscreenedbags[:]:
         if (currentTime >= bag['expiry']):
            print("found expired unscreened!")
            unscreenedbags.remove(bag)

   for bloodtype in bloodtypes:
      print("cool")
      screenedbags = car['blood_'+bloodtype]['screened']
      for bag in screenedbags[:]:
         if (currentTime > bag['expiry']):
            print("cool")
            screenedbags.remove(bag)
            
   # for bloodtype in bloodtypes:
   #    screenedbags = hosp['blood_'+bloodtype]['screened']
   #    for bag in screenedbags[:]:
   #       if (currentTime >= bag['expiry']):
   #          print("found expired unscreened!")
   #          screenedbags.remove(bag)
   #                                                                                                                                                                                                       "unscreened": []}, "blood_B+": {"screened": [], "unscreened": []}, "blood_B-": {"screened": [], "unscreened": []}, "blood_AB+": {"screened": [], "unscreened": []}, "blood_AB-": {"screened": [], "unscreened": []}})
   return '{ "value": "success" }', db


