# Spotify Sleep Timer!
Spotify does not currently have a sleep timer for PC, only in mobile. I have to have music on to sleep but I don't want to drain all of my laptop battery. This program allows you to have a sleep timer by just running the code (and a bit of editing)! 


## Usage
In flask-be, create ".env" file and add the following lines
```
CLIENT_ID = [YOUR_CLIENT_ID]
CLIENT_SECRET = [YOUR_CLIENT_SECRET]
HOST_URL = "http://[YOUR_LOCAL_IP]:3000"
```

In react-fe, create "const.json" and add the following lines
```
const ORIGIN = "http://[YOUR_LOCAL_IP]"
export const SERVER_URL = ORIGIN + ":5001"
export const CLIENT_URL = ORIGIN + ":3000"
```

Add "http://[YOUR_LOCAL_IP]:3000/redirect to the list of redirect links in your Spotify for Developers dashboard"


There are 2 ways of using:

1. Using Docker
If you have docker installed, navigate to where the docker-compose.yml exists and simply run
```
docker compose up
```

3. Manually spinning up both frontend and backend servers
```
cd flask-be
source venv/bin/activate #activate venv
cd ../react-fe
npx serve -s ./build -l 3000
```

The app should be up and running and accessible through a web browser with the URL http://[YOUR_LOCAL_IP]:3000


## Credits
Big ups to Kuncung for guiding me through some React stuff!
