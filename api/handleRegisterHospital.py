def handleRegisterHospital(hosp_name, db):
    # Check if Registered already
    for item in db:
        if (item['type'] == 'hospital'):
            if (item['name'] == hosp_name):
                return '{"value" : "fail"}', db

    db.append({"type": "hospital", "name": hosp_name, "blood_O+": {"screened": [], "unscreened": []}, "blood_O-": {"screened": [], "unscreened": []}, "blood_A+": {"screened": [], "unscreened": []}, "blood_A-": {"screened": [],
                                                                                                                                                                                                                 "unscreened": []}, "blood_B+": {"screened": [], "unscreened": []}, "blood_B-": {"screened": [], "unscreened": []}, "blood_AB+": {"screened": [], "unscreened": []}, "blood_AB-": {"screened": [], "unscreened": []}})
    return '{ "value": "success" }', db

# http://localhost:5000/hospital/register?name=stjohns