
import os
import base64
from requests import post, get, put
import random
import string
import hashlib
import urllib.parse
from flask import Flask, request, redirect,  jsonify
from flask_cors import CORS
from dotenv import main
import re
import time

main.load_dotenv()

app = Flask(__name__)
CORS(app)
print("flask running")


CLIENT_ID = os.getenv('CLIENT_ID')
HOST_URL = os.getenv('HOST_URL')


def get_auth_url():
    code_verifier = ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase + '_-', k=128))
    challenge = base64.urlsafe_b64encode(hashlib.sha256(code_verifier.encode('utf-8')).digest()).decode('utf-8').replace('=', '')
    params =  {
        "response_type": 'code',
        "client_id": CLIENT_ID,
        "scope": "user-read-private user-read-email user-read-currently-playing user-read-playback-state user-modify-playback-state",
        "code_challenge_method": 'S256',
        "code_challenge": challenge,
        "redirect_uri": HOST_URL + "/redirect",
    }

    auth_url = "https://accounts.spotify.com/authorize"
    response = get(auth_url, params=params)
    return response, code_verifier



@app.route('/login.xyz')
def login():
    response, code_verifier = get_auth_url()
    return {"url":response.url, "code_verifier": code_verifier}


@app.route('/redirect.xyz', methods=['POST'])
def request_access_token(): 
    code = request.get_json()['code']
    code_verifier = request.get_json()['code_verifier']
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    data = {
        "client_id": CLIENT_ID,
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": HOST_URL + "/redirect",
        "code_verifier": code_verifier,
    }
    url = "https://accounts.spotify.com/api/token"

    response = post(url, data=data, headers=headers)
    return response.json() , 200

@app.route('/refresh', methods=['POST'])
def refresh():
    headers = request.headers
    refresh_token = headers['refresh-token']
    
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    data = {
            "grant_type": "refresh_token",
            "refresh_token": refresh_token,
            "client_id": CLIENT_ID
            }
    
    url = "https://accounts.spotify.com/api/token"
    response = post(url, headers=headers, data = data)
    return response.json()


@app.route('/pause', methods=['POST'])
def pause():
    headers = request.headers

    authorization = headers['Authorization']

    url = "https://api.spotify.com/v1/me/player/pause"
    headers = {"Authorization": authorization}
    response = put(url, headers=headers)

    return {"message": "playback paused successfully"}, response.status_code

    


if __name__ == '__main__':
    app.run(host="0.0.0.0",port = 5001,debug=True)