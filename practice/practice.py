from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def print_hello():
    return {"message" : "Hellow World!"}

@app.get("/user/{user_id}")
def print_user_id(user_id: int, isAdmin: bool = False):
    return {"user_id" : user_id, "isAdmin" : isAdmin}    