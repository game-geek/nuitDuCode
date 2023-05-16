import requests
import json

# HOST = "https://nuit-du-code-api.onrender.com"
HOST = "http://127.0.0.1:3000"


payload = dict(username="az", password="7619b2")
# error prob with integers
r = requests.post(HOST+'/users/account', data=payload)
print(json.loads(r.content))

payload = dict(username=input("username -> "))
r = requests.post(HOST+'/users/username', data=payload)
print(r.content)
r = requests.get(HOST + '/users')
print(r.content)

payload = dict(username=input("username -> "), password=input("password -> "), score=int(input("score -> ")))
# error prob with integers
r = requests.post(HOST+'/users/update', data=payload)
print(r.content)
r = requests.get(HOST+'/users')
print(r.content)

