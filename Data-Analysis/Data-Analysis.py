import json
import pandas as pd

def merge_file(aurin_file,geo_file):
    aurin_data=open(aurin_file)
    for row in aurin_data:
        print(row)

# Code flow starts here        
if __name__ == "__main__":

    #Specify files needed to run the code
    aurin_file=  './data/Aurin_data.json'
    geo_file = './data/SA4_AUST.json'

    merge_file(aurin_file, geo_file)




 
