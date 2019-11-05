def handleRegisterBatmobile(carid, db):
   db.append({'type': 'batmobile', 'carid': carid, 'blood_O+': 0, 'blood_0-': 0, 'blood_A+': 0, 'blood_A-': 0, 'blood_B+': 0, 'blood_B-': 0, 'blood_AB+': 0, 'blood_AB-': 0 })
   return "{ 'value': 'success' }", db
