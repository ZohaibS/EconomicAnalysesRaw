#!/usr/bin/env python
# coding: utf-8

# In[2]:


# Dependencies
from bs4 import BeautifulSoup
import requests
import os
import pymongo
from splinter import Browser
from splinter.exceptions import ElementDoesNotExist
import pandas as pd
from zipfile import ZipFile
from IPython.display import display_html
import json
import pprint


# In[3]:


# set up the splinter method
executable_path = {'executable_path': 'chromedriver.exe'}
browser = Browser('chrome', **executable_path, headless=False)


# In[4]:


# define the target URLs
url1 = 'http://wdi.worldbank.org/table/6.4' # direction of trade, from low/high to high/low income economies
url2 = 'http://wdi.worldbank.org/table/6.6' # tariff barriers
url3 = 'http://wdi.worldbank.org/table/6.7' # trade facilitation
url4 = 'http://wdi.worldbank.org/table/6.8' # external debt
url5 = 'http://wdi.worldbank.org/table/6.11' # aid dependency
url6 = 'http://wdi.worldbank.org/table/6.14' # travel and tourism
url7 = 'http://wdi.worldbank.org/table/2.5' # unemployment
url8 = 'http://wdi.worldbank.org/table/4.10' # broader measure of national income
url9 = 'http://wdi.worldbank.org/table/4.16' # exchange rates and prices
# browser.visit(url)


# In[5]:


# select the content from the direction of trade table (url1)
start1 = pd.read_html(url1)
trade_direction = start1[2]

trade_direction_list = trade_direction[0]
#trade_direction_list


# In[6]:


# jsonify the trade_direction dataframe 
trade_direction.columns = ['country_name', 'toLow_withinRegion_2006', 'toLow_withinRegion_2016', 'toLow_outRegion_2006', 'toLow_outRegion_2016', 'toHi_withinRegion_2006', 'toHi_withinRegion_2016', 'fromLow_withinRegion_2006', 'fromLow_withinRegion_2016', 'fromLow_outRegion_2006', 'fromLow_outRegion_2016', 'fromHi_withinRegion_2006', 'fromHi_withinRegion_2016']
json_trade_direction = trade_direction.to_json( orient='index')
json_trade_direction


# In[7]:


# select the content from the tariff barriers table (url2)
start2 = pd.read_html(url2)
tariff_barriers = start2[2]

#tariff_barriers.head()
# tariff_barriers_list = tariff_barriers[0]   # print out just the country names
# tariff_barriers_list                        # print out just the country names


# In[9]:


# jsonify the trade_direction dataframe 
tariff_barriers.columns = ['country_name', 'year', 'AllProd_binding_coverage', 'AllProd_simpleMean_boundRate', 'AllProd_simpleMeanTariff', 'AllProd_weightedMeanTariff', 'AllProd_shareOf_tariffLines_INTLpeaks', 'AllProd_shareOf_tariffLines_SpecRates', 'PrimProd_simpleMeanTariff', 'PrimProd_weightedMeanTariff', 'ManufProd_simpleMeanTariff', 'ManufProd_weightedMeanTariff']
json_tariff_barriers = tariff_barriers.to_json( orient='index')
#json_tariff_barriers


# In[11]:


# select the content from the trade faciliation table (url3)
start3 = pd.read_html(url3)
trade_facil = start3[2]

#trade_facil.head()


# In[13]:


# jsonify the trade_facil dataframe 
trade_facil.columns = ['country_name', 'logistics_performance_index_1-5', 'customs_burden_index_1-7', 'leadTime_toExport_days', 'leadTime_toImport_days', 'cost_toExport', 'cost_toImport', 'shipping_connect_index_1-100', 'port_infrastructure_index_1-7']
json_trade_facil = trade_facil.to_json( orient='index')
# json_trade_facil


# In[14]:


# select the content from the external debt table (url4)
start4 = pd.read_html(url4)
external_debt = start4[2]

external_debt.head()


# In[20]:


# jsonify the external_debt dataframe 
external_debt.columns = ['country_name', 'externalDebt_millions', 'externalDebt_%OfGNI', 'LTdebt_guaranteed', 'LTdebt_nonGuaranteed', 'STdebt_millions', 'STdebt_%OfTotalDebt', 'STdebt_%OfTotalReserves', 'totalDebtService_%OfExports', 'totalDebtService_%OfGNI', 'presentDebtValue_%OfExports']
json_external_debt = external_debt.to_json( orient='index')
#json_external_debt


# In[17]:


# select the content from the aid dependency table (url5)
start5 = pd.read_html(url5)
aid_depend = start5[2]

aid_depend.head()


# In[19]:


# jsonify the aid_dependency dataframe 
aid_depend.columns = ['country_name', 'totalAid_millions', 'totalAid_perCapita', 'totalGrants_millions', 'TechCooperation_millions', 'NetDevAssist_%OfGNI', 'NetDevAssist_%ofGrossCapital', 'NetDevAssist_%ofImports', 'NetDevAssist_%ofGovExpenditures']
json_aid_depend = aid_depend.to_json( orient='index')
# json_aid_depend


# In[21]:


# select the content from the travel and tourism table (url6)
start6 = pd.read_html(url6)
travel_tourism = start6[2]

travel_tourism.head()


# In[24]:


# jsonify the travel_tourism dataframe 
travel_tourism.columns = ['country_name', 'INTLtourists_inboundThous_2010', 'INTLtourists_inboundThous_2016', 'INTLtourists_outboundThous_2010', 'INTLtourists_outboundThous_2016', 'inboundTourismExpend_millions_2010', 'inboundTourismExpend_millions_2016', 'inboundTourismExpend_%ofExports_2010', 'inboundTourismExpend_%ofExports_2016', 'outboundTourismExpend_millions_2010', 'outboundTourismExpend_millions_2016', 'outboundTourismExpend_%ofExports_2010', 'outboundTourismExpend_%ofExports_2016']
json_travel_tourism = travel_tourism.to_json( orient='index')
# json_travel_tourism


# In[26]:


# select the content from the unemployment table (url7)
start7 = pd.read_html(url7)
unemployment = start7[2]

unemployment.head()


# In[36]:


# jsonify the unemployment dataframe 
unemployment.columns = ['country_name', 'unemployment_%ofMales_2000', 'unemployment_%ofMales_2016', 'unemployment_%ofFemales_2000', 'unemployment_%ofFemales_2016', 'youth_unemployment_%ofMales_2000', 'youth_unemployment_%ofMales_2016', 'youth_unemployment_%ofFemales_2000', 'youth_unemployment_%ofFemales_2016', 'unemployment_%ofTotal_baseEducation_2013-16', 'unemployment_%ofTotal_mediumEducation_2013-16', 'unemployment_%ofTotal_advancedEducation_2013-16']
json_unemployment = unemployment.to_json( orient='index')
json_unemployment


# In[30]:


# select the content from the broad income measure table (url8)
start8 = pd.read_html(url8)
broadIncomeMeasure = start8[2]

broadIncomeMeasure.head()


# In[32]:


# jsonify the broad income measure dataframe 
broadIncomeMeasure.columns = ['country_name', 'GDP_billions_2016', 'GDP_%meanAnnualGrowth_2000-2016', 'GNI_billions_2016', 'GNI_%meanAnnualGrowth_2000-2016', 'comsumption_fixedCapital_%GNI_2016', 'naturalResourceDeplete_%ofGNI_2016', 'adjust_NNI_billions_2016', 'adjust_NNI_%meanAnnualGrowth_2000-2016']
json_broadIncomeMeasure = broadIncomeMeasure.to_json( orient='index')
# json_broadIncomeMeasure


# In[33]:


# select the content from the exchange rates table (url8)
start9 = pd.read_html(url9)
exchange_rates = start9[2]

exchange_rates.head()


# In[35]:


# jsonify the exchange rates dataframe 
exchange_rates.columns = ['country_name', 'DEC_altConversionFactor_2016', 'DEC_altConversionFactor_2017', 'PPP_convertFactor_2016', 'PPP_convertFactor_2017', 'ratio_PPP_toMarket_2016', 'ratio_PPP_toMarket_2017', 'effectiveExchangeRate_1-100_2016', 'effectiveExchangeRate_1-100_2017', 'GDP_implicitDeflator_%meanGrowth_2016', 'GDP_implicitDeflator_%meanGrowth_2017', 'CPI_%meanGrowth_2015-2016', 'CPI_%meanGrowth_2016-2017']
json_exchange_rates = exchange_rates.to_json( orient='index')
# json_exchange_rates


# In[ ]:




