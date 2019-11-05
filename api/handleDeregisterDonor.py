#This Function should remove the username to the database of people from which we can potentially collect blood
def handleDeregisterDonor(name, db):
   for item in db:
      if (item['name'] == name):
         db.remove(item)
   return "{ 'value': 'success' }", db

