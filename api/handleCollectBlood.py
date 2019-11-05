import datetime
import random

#TODO: THis function should trigger events that result in the collection of blood
# After this function is completed, the batmobile should have more blood of the requested bloodtype
# It should search through the database of users and visit them to collect blood
def handleCollectBlood(carid, bloodtype, db):
   # Check Car is Registered
   carObj = None
   for item in db:
      if (item['type'] == 'batmobile'):
         if (item['carid'] == carid):
            carObj = item
            break
   if carObj == None:
      return '{ "value": "failed", "msg": "car is not registered" }', db
   
   # Check If we have Donors
   bloodAvailable = 0
   for item in db:
      if (item['type'] == 'donor'):
         if (item['bloodtype'] == bloodtype):
            lastCollected = int(item['last_collected'])
            currentTime = int(datetime.datetime.now().timestamp())
            difference = currentTime-lastCollected
            if (difference > 100):
               item['last_collected'] = currentTime
               bloodAvailable = random.randint(100, 500)
               break
   if bloodAvailable == 0:
      return '{ "value": "failed", "msg":"no donors available" }', db

   # Collect the blood in bags
   # Bagsizes = [20, 50, 100, 200, 400]
   collectedBloodList = []
   #This sets the Expirty time (Approx 16 minutes in real time)
   expiryTime = int(datetime.datetime.now().timestamp()) + 1000
   if (bloodAvailable >= 400):
      collectedBloodList.append({'bagsize': 400, 'blood_amount': 400, 'expiry': expiryTime})
      bloodAvailable = bloodAvailable - 400
   while (bloodAvailable >= 200 and bloodAvailable < 400):
      collectedBloodList.append({'bagsize': 200, 'blood_amount': 200, 'expiry': expiryTime})
      bloodAvailable = bloodAvailable - 200
   while(bloodAvailable >= 100 and bloodAvailable < 200):
      collectedBloodList.append({'bagsize': 100, 'blood_amount': 100, 'expiry': expiryTime})
      bloodAvailable = bloodAvailable - 100
   while(bloodAvailable >= 50 and bloodAvailable < 100):
      collectedBloodList.append({'bagsize': 50, 'blood_amount': 50, 'expiry': expiryTime})
      bloodAvailable = bloodAvailable - 50
   while (bloodAvailable >= 20 and bloodAvailable < 50):
      collectedBloodList.append({'bagsize': 20, 'blood_amount': 20, 'expiry': expiryTime})
      bloodAvailable = bloodAvailable - 20
   if (bloodAvailable > 0 and bloodAvailable < 20):
      collectedBloodList.append({'bagsize': 20, 'blood_amount': bloodAvailable, 'expiry': expiryTime})
      bloodAvailable = bloodAvailable - bloodAvailable

   for item in collectedBloodList:
      if (bloodtype == 'A+'):
         carObj['blood_A+']['unscreened'].append(item)
   
   carObj['blood_A+']['unscreened'] = carObj['blood_A+']['unscreened'] + collectedBloodList

   print(str(collectedBloodList))
   

   return '{ "value": "success", "msg":"blood collected!"}', db


# http://localhost:5000/blood/collect?bloodtype=A+&carid=car649
