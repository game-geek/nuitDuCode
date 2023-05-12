import requests

payload = dict(username=input("username -> "))

r = requests.post('http://localhost:3000/users/username', data=payload)
print(r.content)
r = requests.get('http://localhost:3000/users')
print(r.content)

payload = dict(username=input("username -> "), password=input("password -> "), score=int(input("score -> ")))
# error prob with integers
r = requests.post('http://localhost:3000/users/update', data=payload)
print(r.content)
r = requests.get('http://localhost:3000/users')
print(r.content)