import tweepy
import credentials
import pickle
import couchdb


# variables from git ignored creds.py file
user = credentials.dbuser
password = credentials.dbpassword
COUCH_ADDRESS = "localhost"

# key and secret variables from git ignored creds.py file
consumer_key = credentials.consumer_key
consumer_secret = credentials.consumer_secret

# Twitter auth
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
api = tweepy.API(auth)

# Import coord wealth dict. {SA2 Code: {Median Price, Coordinates}}
# e.g. use wealth_dict[206041123] for north melbourne
wealth_dict = pickle.load(open("wealth_dict_file.pkl", "rb"))


# Connect to Couch DB Server
server = couchdb.Server("http://{}:{}@{}:5984/".format(user, password, COUCH_ADDRESS))

# Create tweets DB if it doesnt exist
dbname = 'tweets'

if dbname in server:
    db = server[dbname]
else:
    db = server.create(dbname)


# couchdbid : tweet_id
# Save dict if tweets that have already been saved
db_tweet_dict = {}

# Example Query
latest_id = None
# 1km radius as 0.01 is 1km
# 450 requests per 15 minutes

for tweet in tweepy.Cursor(api.search, geocode='-37.8,144.99,1km').items(10):
    if tweet.id not in db_tweet_dict.keys():
        doc_id, doc_rev = db.save({'SA2': '206071139', 'tweet_id': tweet.id, 'text': tweet.text})
        db_tweet_dict[tweet.id] = doc_id



print(wealth_dict)












