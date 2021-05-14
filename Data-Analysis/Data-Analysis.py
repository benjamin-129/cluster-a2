import json
import pandas as pd

def merge_data(get_unemployment,geo_data):
    output={"type": "FeatureCollection", "features":[]}
    for row in geo_data['features']:
        for line in get_unemployment:
            if int(line['sa4_code'])==int(row['properties']['SA4_CODE16']):
                row['properties']["SA4_UNEMP"]=str(line['sa4_unemp'])
            else:
                row['properties']["SA4_UNEMP"]='No Record'
   
    with open('output.json', 'w') as outfile:
        json.dump(geo_data, outfile)

# Code flow starts here        
if __name__ == "__main__":

    #Specify files needed to run the code
    unemployment_file=  './data/SA4_unemployment.json'
    geo_file = './data/SA4_geojson.json'

    unemployment_data = json.load(open(unemployment_file, 'r'))
    geo_data=json.load(open(geo_file, 'r'))
    get_unemployment = [{
            'sa4_unemp': feature['properties']['unemployed_tot_000'],
            'sa4_name': feature['properties']['sa4_name'],
            'sa4_code': feature['properties']['sa4_code'],
            }for feature in  unemployment_data['features']] 


    merge_data(get_unemployment,geo_data)





 
