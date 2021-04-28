import os
import tweepy
import pandas as pd
import creds
import pickle

# key and secret variables from git ignored creds.py file
consumer_key = creds.consumer_key
consumer_secret = creds.consumer_secret

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)

api = tweepy.API(auth)

# Load coord wealth dict. {SA2 Code: {Price, Coordinates}}
# e.g. use wealth_dict[206041123] for north melbourne
wealth_dict = pickle.load(open("wealth_dict_file.pkl", "rb"))


# Example Query
latest_id = None
for tweet in tweepy.Cursor(api.search, geocode='-37.8,144.99,1km').items(10):
    print(tweet.id)
    print(tweet.text)
    latest_id = tweet.id

print('latest')
print(latest_id)












