def handleRegisterBatmobile(carid, db):
   #Check if Registered already
   for item in db:
      if (item['type'] == 'batmobile'):
         if (item['carid'] == carid):
            return '{"value" : "fail"}', db

   db.append({"type": "batmobile", "carid": carid, "blood_O+": { "screened": [], "unscreened": []} , "blood_0-": { "screened": [], "unscreened": []} , "blood_A+":{ "screened": [], "unscreened": []} , "blood_A-": { "screened": [], "unscreened": []} , "blood_B+": { "screened": [], "unscreened": []} , "blood_B-": { "screened": [], "unscreened": []}, "blood_AB+": { "screened": [], "unscreened": []} , "blood_AB-": { "screened": [], "unscreened": []} })
   return '{ "value": "success" }', db

# http://localhost:5000/batmobile/register?carid=car649