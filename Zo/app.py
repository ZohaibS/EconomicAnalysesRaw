from flask import Flask, render_template, jsonify, redirect
from flask_pymongo import PyMongo
import pymongo
import json
import pandas as pd
from bson.json_util import dumps

app = Flask(__name__)

conn = 'mongodb://localhost:27017/Economic_Data'

client = PyMongo(app, uri=conn)

@app.route('/')
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/unemployment")
def aggregate_data():
    
    cursor = client.db.unemployment_data
    data = cursor.find()
    data2 = dumps(data)

    return(data2)
if __name__ == "__main__":
    app.run(debug=True)