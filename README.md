# ProjectVampire

### Running Guide
1. clone this repo to your computer
1. Install Python
2. Install venv: `sudo apt install python3-venv`
3. Navigate to `/api/` and enter `source venv/bin/activate`
4. Run `pip install Flask` while in `(venv)` mode
5. Run `python api.py` which is in `/api` directory to run the server
6. Test it is working by navigating to the localhost url as shown in termal. The window should display 'working'

### File Explanation
- `api/api.py` - This contains the routes exposing the api endpoints
- `handleXXXXXX` - Files beginning with `handle` are api endpoint handlers


### Sample Queries
Some to test queries, navigate to the url as directed in your terminal (should be `localhost:5000`)

- Entering `http://localhost:5000/donor/register?name=anto&bloodtype=0-` should display `TODO: HandleRegisterDonor`
- Entering `http://localhost:5000/blood/request?amount=50&hospital=stmarys&bloodtype=a+` should display `TODO: HandleBloodRequest`
- Entering `http://localhost:5000/blood/collect?bloodtype=A+&carid=batmobile` should display `TODO: HandleBloodRequest`

