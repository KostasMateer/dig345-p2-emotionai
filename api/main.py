from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "hello"

@app.route("/about")
def about():
    return "Hello about"