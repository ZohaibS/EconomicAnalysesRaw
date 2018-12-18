from flask import Flask, render_template, jsonify, redirect
from flask_pymongo import PyMongo
import pymongo
import scraper
import json
import pandas as pd

app = Flask(__name__)

conn = 'mongodb://localhost:27017/napkin_math_db'

client = PyMongo(app, uri=conn)

@app.route('/')
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/scrape")
def scrape():
    
   #Saving to Mongo
    
    
    

    lists_data = scraper.Scrape()

    #lists_data_dictionary = {"Country_Reports": lists_data}
    
    # #Saving to Mongo
    # lists.update(
    #     {},
    #     lists_data_dictionary,
    #     upsert=True
    # )
    lists = client.db.Lists
    
    for country in lists_data[0 : len(lists_data)]:
        lists.insert_one({'Country': country})
    

    #The jsonify is just for something pretty to look at when testing the route
    #before having a structured html.
    return jsonify(lists_data)
    #return redirect("http://localhost:5000/", code=302)



# @app.route("/countries")
# def countries():
#     """Return a list of sample names."""
#     #Countries = client.db.Lists.distinct('Country')
#     # Use Pandas to perform the sql query
# #    stmt = db.session.query(Samples).statement
# #    df = pd.read_sql_query(stmt, db.session.bind)
#     # Return a list of the column names (sample names)
#     #return jsonify(list(df.columns)[2:])

#     unique_countries = client.db.Lists.distinct("Country")
#     #unique_countries = db.distinct("Country")
#     return unique_countries

@app.route("/all")
def aggregate_data():
    
    cursor = client.db.Lists
    data = cursor.distinct('Country')
    Data = jsonify(data[0:len(data)])

    return(Data)

    


@app.route("/countries/<country_index>")
def countries(country_index):

    cursor = client.db.Lists
    data = cursor.distinct('Country')

    #df = pd.DataFrame(list((cursor).find()))

    # country_data = df.loc[df[country] > 1, [country, "Longitude", "Latitude", "GrowthOne", "GrowthTwo"]]
    # data = {
    #     "Country" : country_data[country].values.tolist(),
    #     "Longitude" : country_data.long.values.tolist(),
    #     "Latitude" : country_data.lat.values.tolist(),
    #     "GrowthOne" : country_data.GrowthOne.values.tolist(),
    #     "GrowthTwo" : country_data.GrowthTwo.values.tolist(),
    # }
    #print(str(data))
    Data = jsonify(data[int(country_index)])
    
    #df = pd.read_json(Data)


    return Data

if __name__ == "__main__":
    app.run(debug=True)
