# ProjectVampire

### Running Guide
1. Install Python
2. Install venv: `sudo apt install python3-venv`
3. Navigate to `/api/` and enter `source venv/bin/activate`
4. Run `pip install Flask` while in `(venv)` mode
5. Run `python api.py` which is in `/api` directory to run the server
6. Test it is working by navigating to the localhost url as shown in termal. The window should display 'working'

### Sample Queries
Some to test queries, navigate to the url as directed in your terminal (should be `localhost:5000`)

Entering `http://localhost:5000/registerdonor?name=jane&bloodtype=a` should display `TODO: HandleRegisterDonor`
Entering `http://localhost:5000/requestblood?amount=50&hospital=stmarys&bloodtype=B+` should displayer `TODO: HandleBloodRequest`

