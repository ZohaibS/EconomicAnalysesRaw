#----Sample of Scraping Dependencies----
# from splinter import Browser
# from bs4 import BeautifulSoup
# from urllib.parse import urlsplit
# import pandas as pd
# import re
# import time
# import json

#This file is strictly for the purposes of testing the dataflow.
#So instead of a scrape(), it will just generate two random lists
#and format them nicely for use in our Flask app.
def Scrape():    
    #import numpy as np
    country_data = [{'Country': 'Angola', 'long': '45', 'lat':'68', 'GrowthOne': '4', 'GrowthTwo': '6'},
                    {'Country': 'Brazil', 'long': '37', 'lat':'57', 'GrowthOne': '0.5', 'GrowthTwo': '3'},
                    {'Country': 'China', 'long': '53', 'lat':'64', 'GrowthOne': '9', 'GrowthTwo': '2'}]

    
    #packaged_lists = {[list(list_1), list(list_2)]}
    #country_list = {'Data': country_data }

    #Packaging the lists for MongoDB to easily read later.
    return(country_data);