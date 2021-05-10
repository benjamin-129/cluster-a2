import tweepy
import pickle
import couchdb
import json
import math
from urllib3.exceptions import ProtocolError


user = 'admin'
password = 'password1'
COUCH_ADDRESS = "localhost"

consumer_key = 'by51unN9bsgHAfk6vzaTCPUin'
consumer_secret = 'a1mBXkR09cPPOv2d3mIqr0W3AmIllA9g1L8aLAqRxS7RvIEHsm'
access_token ='1382216004235784195-MDQ0DqGEfGl9noXYHYpYMVb1qWu71O'
access_secret = '9D0Igfa4vUOLVWAoxUM64n1lAoh5lqwLG9MkKgqlh297C'
bearer_token = 'AAAAAAAAAAAAAAAAAAAAAL5YOgEAAAAAO6tFFpBipXLx3PgFwFkrn%2B0KfKU%3D445Qb1W8n7EsrXvZ6pIsfJDNQJx6h0rmJzAboi6P7Jx2QKpdN7'

# Twitter auth
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
api = tweepy.API(auth)

# Connect to Couch DB Server
server = couchdb.Server("http://{}:{}@{}:5984/".format(user, password, COUCH_ADDRESS))

# Create tweets DB if it doesnt exist
dbname = 'tweets'

if dbname in server:
    db = server[dbname]
else:
    db = server.create(dbname)



# Bounding Boxes

bounding_box = [113.338953078, -43.6345972634, 153.569469029, -10.6681857235]

num_harvester = 1

harvester_code = 0

def create_sub_bbox(bounding_box, num):
    sub_bbox = []
    interval = math.floor((bounding_box[2] - bounding_box[0])/num*100000000)/100000000
    for i in range(num):
        sub_bbox.append([bounding_box[0]+interval*i, bounding_box[1], bounding_box[0]+interval*(i+1), bounding_box[3]])

    sub_bbox[num-1][2]=bounding_box[2]

    return sub_bbox

##sub_bbox = create_sub_bbox([140.946597, -39.138210, 147.698657, -35.936027], num_harvester)
sub_bbox = create_sub_bbox([138.494335, -35.009266, 138.78049, -34.785160], num_harvester)



class MyStreamListener(tweepy.StreamListener):

    def on_status(self, status):
        print(status.text)

    def on_data(self, data):
        tweet = json.loads(data)
        doc_id = tweet["id_str"]
        if doc_id not in db:
            db[doc_id] = {"tweet": tweet}
        print("new tweet: "+doc_id)

myStreamListener = MyStreamListener()
# myStream = tweepy.Stream(auth=api.auth, listener=myStreamListener)
# myStream = tweepy.Stream(auth=api.auth)



class tweet_harvester(tweepy.Stream):

    def on_status(self, status):
        print(status.id)
    # def on_status(self, status):
    #     print(status.text)
    #
    # def on_data(self, data):
    #     tweet = json.loads(data)
    #     doc_id = tweet["id_str"]
    #     if doc_id not in db:
    #         db[doc_id] = {"tweet": tweet}
    #     print("new tweet: " + doc_id)



# tweet_stream = tweepy.Stream(consumer_key, consumer_secret, access_token, access_secret)

tweet_stream = tweepy.Stream(auth=api.auth, listener=myStreamListener)
tweet_stream.sample()

# while True:
#     try:
#         # myStream.filter(locations=sub_bbox[harvester_code])
#         tweet_stream.filter(locations=bounding_box)
#     except ProtocolError:
#         continue

# print(create_sub_bbox(bounding_box, 3))



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












