import os
import tweepy
import pandas as pd
import creds
import pickle
import couchdb

COUCH_ADDRESS = "localhost"
# variables from git ignored creds.py file
user = creds.dbuser
password = creds.dbpassword

# key and secret variables from git ignored creds.py file
consumer_key = creds.consumer_key
consumer_secret = creds.consumer_secret

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)

api = tweepy.API(auth)

# Load coord wealth dict. {SA2 Code: {Price, Coordinates}}
# e.g. use wealth_dict[206041123] for north melbourne
wealth_dict = pickle.load(open("wealth_dict_file.pkl", "rb"))


server = couchdb.Server("http://{}:{}@{}:5984/".format(user, password, COUCH_ADDRESS))

dbname = 'tweets'

if dbname in server:
    db = server[dbname]
else:
    db = server.create(dbname)


# couchdbid : tweet_id
db_tweet_dict = {}

# Example Query
latest_id = None
# 1km radius as 0.01 is 1km
# 450 requests per 15 minutes

for tweet in tweepy.Cursor(api.search, geocode='-37.8,144.99,1km').items(10):
    if tweet.id not in db_tweet_dict.keys():
        doc_id, doc_rev = db.save({'SA2' : '206071139', 'tweet_id': tweet.id, 'text': tweet.text})
        db_tweet_dict[tweet.id] = doc_id



print(wealth_dict)












