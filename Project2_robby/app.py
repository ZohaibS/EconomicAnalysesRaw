from flask import Flask, render_template, jsonify, redirect
from flask_pymongo import PyMongo
import scrape_mars

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/scrape_data" # is this where we put in economic analysis?
mongo = PyMongo(app)


@app.route("/")
def index():
    # listings = mongo.db.listings.find_one()
    world_tables = mongo.db.Economic_Analysis.find_one()
    # strippedTitle = titleResult["strippedTitle"]
    return render_template("index.html", world_tables = world_tables)
    

@app.route("/scrape_world_tables.py")
def scrape():
    world_tables = mongo.db.Economic_Analysis #CHANGED THIS TO ECONOMIC ANALYSIS
    world_tables = world_tables.scrape()
    # strippedTitle = "strippedTitle"
    world_tables.update(
        {},
        world_tables,
        upsert=True
    )
    return redirect("http://localhost:5000/", code=302)


if __name__ == "__main__":
    app.run(debug=True)