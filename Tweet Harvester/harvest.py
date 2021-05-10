import tweepy
import pickle
import couchdb
import time


# 0 , 1 ,2
HARVESTER_NUMBER = 0


# SA4 Coordinates & Sq Km
sa4_coord = pickle.load(open('sa4_coord.pkl', 'rb'))

user = 'admin'
password = 'password1'
COUCH_ADDRESS = "localhost"


consumer_key = 'by51unN9bsgHAfk6vzaTCPUin'
consumer_secret = 'a1mBXkR09cPPOv2d3mIqr0W3AmIllA9g1L8aLAqRxS7RvIEHsm'
access_token ='1382216004235784195-MDQ0DqGEfGl9noXYHYpYMVb1qWu71O'
access_secret = '9D0Igfa4vUOLVWAoxUM64n1lAoh5lqwLG9MkKgqlh297C'
bearer_token = 'AAAAAAAAAAAAAAAAAAAAAL5YOgEAAAAAO6tFFpBipXLx3PgFwFkrn%2B0KfKU%3D445Qb1W8n7EsrXvZ6pIsfJDNQJx6h0rmJzAboi6P7Jx2QKpdN7'

m_consumer_key = 'HPweML7H0Qi7DY1LWSa9ocDFr'
m_consumer_secret = 'vE0s5DgfOs3EZX3shaxvNFW2GkLC9RSZRY3j9JjSD4KNe9oSSj'
m_access_token = '1388352109737693187-2NfhtuMlv3x9JBBH5NMJQ5TODIWfEo'
m_access_secret = 'p08FPkJ1Aw97v8OZ0kuYiQl8bRwHdRZNkYBvxGAn7Ckx3'
m_bearer_token = 'AAAAAAAAAAAAAAAAAAAAADOkPQEAAAAA3AGNL7PTXJu%2FXhMmoWdmVLtqciE%3Ddv63JSsAjIfimfYAy5vaBhqgRJLf3eOlUSziZgKHuQTZJJxchh'

j_consumer_key = 'jEdM6llEjogsvqNhpQLDbY31V'
j_consumer_secret = 'fauV1Aon98J3a0unebvJioYcx3Hts5oMov8mjSQ4u7IYQy4X9h'



if HARVESTER_NUMBER == 0:
    # Twitter auth
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    api = tweepy.API(auth)
if HARVESTER_NUMBER == 1:
    auth = tweepy.OAuthHandler(m_consumer_key, m_consumer_secret)
    api = tweepy.API(auth)

if HARVESTER_NUMBER == 2:
    auth = tweepy.OAuthHandler(j_consumer_key, j_consumer_secret)
    api = tweepy.API(auth)



# Connect to Couch DB Server
server = couchdb.Server("http://{}:{}@{}:5984/".format(user, password, COUCH_ADDRESS))

# Create tweets DB if it doesnt exist
dbname = 'tweets'

if dbname in server:
    db = server[dbname]
else:
    db = server.create(dbname)



# Store oldest tweet harvested for each SA4 query
tweet_sa4_min = {}

# db['123456'] = {'hello': '123'}

def push_tweets(sa4, api, min_id=None):
    processed_coord = sa4_coord[sa4]['processed_coord']
    coord = sa4_coord[sa4]['coord']

    if min_id is not None:
        str_id = str(min_id)
        tweets = tweepy.Cursor(api.search, geocode=processed_coord, max_id=str_id, lang='en').items(10)
    else:
        tweets = tweepy.Cursor(api.search, geocode=processed_coord, lang='en').items(10)

    id_list = []
    for tweet in tweets:
        doc_id = str(tweet.id)
        id_list.append(tweet.id)
        # id_list.append(doc_id)
        text = tweet.text
        user = tweet.user._json['id_str']

        if doc_id not in db:
            db[doc_id] = {'text': text, 'user': user, 'sa4': sa4, 'coord': coord,
                          'processed_coord': processed_coord}

    if not id_list:
        code_to_process.remove(sa4)
    else:
        tweet_sa4_min[sa4] = min(id_list)



h0_keys = [key for key in list(sa4_coord.keys()) if key[0] in ['1', '7', '8']]
h1_keys = [key for key in list(sa4_coord.keys()) if key[0] in ['2', '4', '6']]
h2_keys = [key for key in list(sa4_coord.keys()) if key[0] in ['3', '5']]


if HARVESTER_NUMBER==0:
    code_to_process = h0_keys
elif HARVESTER_NUMBER==1:
    code_to_process = h1_keys
elif HARVESTER_NUMBER==2:
    code_to_process = h2_keys
else:
    code_to_process = sa4_coord.keys()


while (True):
    for sa4 in code_to_process:
        print(sa4)
        try:
            push_tweets(sa4, api, tweet_sa4_min[sa4])
        except KeyError:
            push_tweets(sa4, api)
        except tweepy.TweepError:
            time.sleep(900)



    # If there has been a search done before and min id is stored.
    # try:
    #     min_id = tweet_sa4_min[sa4]
    #     tweets = tweepy.Cursor(api_b.search, geocode=processed_coord, max_id = min_id-1, lang='en').items(10)
    #     id_list = []
    #     for tweet in tweets:
    #         doc_id = tweet.id
    #         id_list.append(doc_id)
    #         text = tweet.text
    #         user = tweet.user._json['id_str']
    #
    #         if doc_id not in db:
    #             db[doc_id] = {text, user, sa4, coord, processed_coord}
    #
    #     tweet_sa4_min[sa4] = min(id_list)
    #
    # # First search
    # except KeyError:
    #     tweets = tweepy.Cursor(api_b.search, geocode=processed_coord, lang='en').items(10)
    #     print(len([tweet for tweet in tweets]))
    #
    #     if len([tweet for tweet in tweets]) > 0:
    #
    #         id_list = []
    #         for tweet in tweets:
    #             print(tweet.id)
    #             doc_id = tweet.id
    #             id_list.append(doc_id)
    #             text = tweet.text
    #             user = tweet.user._json['id_str']
    #
    #             if doc_id not in db:
    #                 db[doc_id] = {text, user, sa4, coord, processed_coord}
    #
    #         tweet_sa4_min[sa4] = min(id_list)
    #
    #     else:
    #         sa4_active.remove(sa4)


    # except RateLimitError:



# tweets = tweepy.Cursor(api_b.search, geocode=sa4_coord['117']['processed_coord'], lang='en').items(5)
# #
#
# print(len([tweet for tweet in tweets]))
# for tweet in tweets:
#     print(tweet.text)
#     print(tweet.id)
#     print(tweet.user._json['id_str'])

# print(sa4_coord['117']['processed_coord'][0])


# print(sa4_active)

# Assume are is a circle.

# print(sa4_coord)














