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
# NSW starts w 1, VIC starts w 2, QLD starts w 3
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
db_tweet_l = []

# 1km radius as 0.01 is 1km
# 450 requests per 15 minutes


# Change to find min?
# def find_max_id(SA2code):
#     mango = {'selector': {'SA2': SA2code, 'tweet_id': {"$gte": 0}},
#              'fields': ['tweet_id', 'text'],
#              'limit': 1
#              }
#
#     for row in db.find(mango):
#         return row['tweet_id']
#
# def tweet_input(SA2code, geo, latest_id):
#     x = str(geo[0])
#     y = str(geo[1])
#     gcode = x + ',' + y + ",1km"
#
#     if latest_id is None:
#         for tweet in tweepy.Cursor(api.search, geocode=gcode).items(10):
#             if tweet.id not in db_tweet_l:
#                 doc_id, doc_rev = db.save({'SA2': SA2code, 'tweet_id': tweet.id, 'text': tweet.text})
#                 # db_tweet_dict[tweet.id] = doc_id
#                 db_tweet_l.append(tweet.id)
#
#     else:
#         for tweet in tweepy.Cursor(api.search, since_id=latest_id, geocode=gcode).items(10):
#             if tweet.id not in db_tweet_l:
#                 doc_id, doc_rev = db.save({'SA2': SA2code, 'tweet_id': tweet.id, 'text': tweet.text})
#                 # db_tweet_dict[tweet.id] = doc_id
#                 db_tweet_l.append(tweet.id)
#
#
# counter = 0
# while len(db_tweet_l) < 30:
#
#     print(len(db_tweet_l))
#     if len(db_tweet_l) == 0:
#         print('hi')
#         if counter == 1:
#             break
#         else:
#             tweet_i = None
#             counter +=1
#     else:
#         print('easd')
#         tweet_i = find_max_id('206071139')
#         print(tweet_i)
#     tweet_input('206071139', [-37.8, 144.99], tweet_i)







# db.index('fields': 'tweet_id')
# Mango query to get SA2

        # print(row['tweet_id'])


# SA2_query = '206071139'
# mango = {'selector': {'SA2': SA2_query, 'tweet_id': {"$gte": 0}},
#          'fields': ['tweet_id', 'text'],
#          # 'sort': ['tweet_id'],
#          'limit' : 1
#          }
#
#
# for row in db.find(mango):
#     print(row['tweet_id'])

# print(wealth_dict)












