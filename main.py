import requests
import json
import asyncio
from multiprocessing import Process
# SuperFastPython.com
# example of extending the Process class and adding shared attributes
from time import sleep
from multiprocessing import Process
from multiprocessing import Value
 
# custom process class
class CustomProcess(Process):
    # override the constructor
    def __init__(self):
        # execute the base constructor
        Process.__init__(self)
        # initialize integer attribute
        self.data = Value('i', 0)
 
    # override the run function
    def run(self):
        # block for a moment
        sleep(1)
        # store the data variable
        print(f'Child stored: {self.data.value}')
        self.data.value = 100
        # report stored value
        print(f'Child stored: {self.data.value}')
 
# entry point

class Post(Process):
    # override the constructor
    def __init__(self):
        # execute the base constructor
        Process.__init__(self)
        # initialize integer attribute
        self.data = Value('i', 0)
        self.finished = Value('i', False)
        self.url = Value('str', "")
 
    # override the run function
    def run(self):
        # do actions
        self.finished = Value('i', True)
        # self.data = Value("")
        print(f'url = {self.url} finished: {self.finished}')
if __name__ == '__main__':
    # create the process
    process = CustomProcess()
    # start the process
    process.data = Value("i", 1)
    process.start()
    # wait for the process to finish
    print('Waiting for the child process to finish')
    # block until child process is terminated
    # process.join()
    # report the process attribute
    while True:
        if process.data.value >= 100:
            print(f'Parent got: {process.data.value}')
            break
    
    p = Post()
    p.url = Value("str", "123456")
    p.start()
    p.join()
    print("enddd", p.data.value)
    
x = 0
async def main():
    global x
    print('Hello ...')
    payload = dict(username="az", password="7619b2")
    # error prob with integers
    r = requests.post(HOST+'/users/account', data=payload)
    print(json.loads(r.content))
    print('... World!')
    asyncio.sleep(1000)
    x = 100


# HOST = "https://nuit-du-code-api.onrender.com"
# # HOST = "http://127.0.0.1:3000"

# print("starting ...")
# # payload = dict(username="az", password="7619b2")
# # # error prob with integers
# # r = requests.post(HOST+'/users/account', data=payload)
# # print(json.loads(r.content))

# # payload = dict(username=input("username -> "))
# # r = requests.post(HOST+'/users/username', data=payload)
# # print(r.content)
# # r = requests.get(HOST + '/users')
# # print(r.content)

# # payload = dict(username=input("username -> "), password=input("password -> "), score=int(input("score -> ")))
# # # error prob with integers
# # r = requests.post(HOST+'/users/update', data=payload)
# # print(r.content)
# # r = requests.get(HOST+'/users')
# # print(r.content)




# asyncio.run(main())
# x = 5
# print(x)
# for i in range(0, 10):
#     print("while")
#     print(i)
# print(x)