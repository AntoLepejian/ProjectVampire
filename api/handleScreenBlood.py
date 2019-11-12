#This function should result in the car going to the pathology and result in all carried blood going from unscreened -> screened
def handleScreenBlood(carid, db):
   #Find Car
   curcar = None
   for item in db:
      if (item['type'] == 'batmobile'):
         if (item['carid'] == carid):
            curcar = item
            break
   if (curcar == None):
      return '{ "value": "failed", "msg": "car is not registered" }', db
   
   
   bloodtypes = ['A+', 'A-', 'O+', 'O-', 'B+', 'B-', 'AB+', 'AB-']

   for bloodtype in bloodtypes:
      unscreenedbags = curcar['blood_'+bloodtype]['unscreened']
      for bag in unscreenedbags[:]:
         curcar['blood_'+bloodtype]['screened'] = curcar['blood_'+bloodtype]['screened'] + [bag]
         unscreenedbags.remove(bag)

   return '{"value": "success"}', db


