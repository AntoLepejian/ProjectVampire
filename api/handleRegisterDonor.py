#This Function should add the username to the database of people from which we can potentially collect blood

def handleRegisterDonor(name, bloodtype, db):
   db.append({'type': 'donor', 'name': name, 'bloodtype': bloodtype})
   return "{ 'value': 'success' }", db

