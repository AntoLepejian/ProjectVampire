import datetime
import json


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
         curr_blood_list = sortBloodList(item['blood_'+bloodtype]['screened'])
         #iterate through the bags available in that car of the required bloodtype
         print(type(curr_blood_list))
         print("===========================================\n")
         for bag in curr_blood_list[:]:
            if (currentTime < bag['expiry']):
               bloodRequired = bloodRequired - bag['blood_amount']
               collectedBloodBags.append(bag)
               curr_blood_list.remove(bag)
               if (bloodRequired < 0):
                  break


   hospObj['blood_'+bloodtype]['screened'] = hospObj['blood_'+bloodtype]['screened'] + collectedBloodBags
   if (bloodRequired <= 0):
      return '{ "value": "success" }', db

   collectedAmount = amount - bloodRequired
   if (len(collectedBloodBags) == 0):
      return '{"value": "failed", "msg": "No Blood Available!" }', db
   else:
      print("Partial Success")
      retMsg = {
         'value' : "partial-success",
         'msg': "Partially Collected " + str(collectedAmount) + "mL out of " + str(amount) + "mL"
      }
      return json.dumps(retMsg), db
      # return '{"value" : "partial-success", "msg" : "Partially collected {} out of {}" }'.format(collectedAmount, amount), db
     
def sortBloodList(blood_list):
   #ensures for all elements are sorted by blood amount
   #,and equal blood amounts are sorted by expiry
   i = 0
   print("Before:\n")
   print(blood_list)
   # First we sort by blood amount
   while (i < len(blood_list)):
      counter = 0
      while (counter < len(blood_list)-1):
         currBag = blood_list[counter]
         nextBag = blood_list[counter+1]
         if (currBag["blood_amount"] < nextBag["blood_amount"]):
            blood_list[counter], blood_list[counter+1] = nextBag, currBag
         counter = counter + 1
      i = i + 1
   print("After:\n")
   print(blood_list)
   # Next we sort by Expiry
   m = 0
   while (m < len(blood_list)):
      count = 0
      while (count < len(blood_list)-1):
         currBag = blood_list[count]
         nextBag = blood_list[count+1]
         if (currBag["blood_amount"] == nextBag["blood_amount"]):
            if (currBag["expiry"] > nextBag["expiry"]):
               blood_list[count], blood_list[count+1] = nextBag, currBag
         count = count + 1
      m = m + 1
   print("AfterMore:\n")

   print(blood_list)
   return blood_list