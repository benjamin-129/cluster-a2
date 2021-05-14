import json
import pandas as pd
import couchdb


user = 'admin'
password = 'password'
COUCH_ADDRESS = 'localhost'

# Connect to Couch DB Server
# server = couchdb.Server("http://{}:{}@{}:5984/".format(user, password, COUCH_ADDRESS))

server = couchdb.Server("http://{}:{}@{}:15984/".format(user, password, COUCH_ADDRESS))

db = server['tweets']

tweet_counts = {}
sent_sum = {}

# Store Tweet Counts
for code in db.view('Results/TweetCount', group='true'):
    tweet_counts[code.key] = code.value

# Store Tweet Counts
for code in db.view('Results/SentimentSum', group='true'):
    sent_sum[code.key] = code.value

#
# def merge_file(aurin_file,geo_file):
#     aurin_data=open(aurin_file)
#     for row in aurin_data:
#         print(row)
#
# # Code flow starts here
# if __name__ == "__main__":
#
#     #Specify files needed to run the code
#     aurin_file=  './data/Aurin_data.json'
#     geo_file = './data/SA4_AUST.json'
#
#     merge_file(aurin_file, geo_file)




 
