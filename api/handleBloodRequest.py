import datetime


#TODO: THis function should trigger events that result in blood being delivered to the Hospital 
# If there is enough blood, it should return so and trigger events as so
# If there is not enough blood, it should do something else
def handleBloodRequest(amount, hospital_name, bloodtype, db):
   #Check Hospital is Registered
   hospObj = None
   for item in db:
      if (item['type'] == 'hospital'):
         if (item['name'] == hospital_name):
            hospObj = item
            break
   if hospObj == None:
      return '{ "value": "failed", "msg": "hospital is not registered" }', db

   #Check The Batmobiles for blood
   bloodRequired = amount
   currentTime = int(datetime.datetime.now().timestamp())
   collectedBloodBags = []
   for item in db:
      if (item['type'] == 'batmobile'):
         print("found batmobile!")
         curr_blood_list = item['blood_'+bloodtype]['screened']
         #iterate through the bags available in that car of the required bloodtype
         for bag in curr_blood_list[:]:
            if (currentTime < bag['expiry']):
               bloodRequired = bloodRequired - bag['blood_amount']
               collectedBloodBags.append(bag)
               curr_blood_list.remove(bag)
               if (bloodRequired < 0):
                  return '{ "value": "success" }', db


   hospObj['blood_'+bloodtype]['screened'] = hospObj['blood_'+bloodtype]['screened'] + collectedBloodBags
   collectedAmount = amount - bloodRequired
   if (len(collectedBloodBags) == 0):
      return '{"value": "failure" }', db
   else:
      return '{"value" : "partial-success", "amount" : "%d" }' % collectedAmount, db
     
