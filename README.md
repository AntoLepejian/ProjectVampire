# ProjectVampire

### Running Guide

#### Backend

0. clone this repo to your computer
1. Install Python
1. Update apt-get `sudo apt-get update`
1. Install venv: `sudo apt install python3-venv`
1. Navigate to `/api/` and enter `source venv/bin/activate`
1. type `export LC_ALL=C`
1. Run `pip install Flask` while in `(venv)` mode
1. Run `pip install tinydb` while in `(venv)` mode
1. Run `python api.py` which is in `/api` directory to run the server
1. Test it is working by navigating to the localhost url as shown in termal. The window should display 'working'

#### Frontend

0. cd frontend
1. npm install
1. npm start

### File Explanation

- `api/api.py` - This contains the routes exposing the api endpoints
- `handleXXXXXX.py` - Files beginning with `handle` are api endpoint handlers

### Sample Queries

Some to test queries, navigate to the url as directed in your terminal (should be `localhost:5000`)

- Entering `http://localhost:5000/donor/register?name=anto&bloodtype=0-` should display `TODO: HandleRegisterDonor`
- Entering `http://localhost:5000/blood/request?amount=50&hospital=stmarys&bloodtype=a+` should display `TODO: HandleBloodRequest`
- Entering `http://localhost:5000/blood/collect?bloodtype=A+&carid=batmobile` should display `TODO: HandleBloodRequest`
