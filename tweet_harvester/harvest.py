import tweepy
import pickle
import couchdb
import time
import argparse
import datetime
from sklearn import preprocessing
import numpy as np
import json
import sys
from afinn import Afinn


# sys.path.append('/tweet_harvester')

parser = argparse.ArgumentParser(description='Harvester Node Number')
parser.add_argument('h_number', type=int, help='an integer for the accumulator')
parser.add_argument('couch_address', type=str, help='CouchDB IP Address')

args = parser.parse_args()

# 0 , 1 ,2
HARVESTER_NUMBER = args.h_number
print("Running Tweet Harvester: Harvester Number:", HARVESTER_NUMBER)

# SA4 Coordinates & Sq Km
sa4_coord = pickle.load(open('sa4_coord.pkl', 'rb'))

user = 'admin'
password = 'password'
COUCH_ADDRESS = args.couch_address


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
# server = couchdb.Server("http://{}:{}@{}:15984/".format(user, password, COUCH_ADDRESS))
server = couchdb.Server("http://{}:{}@{}:15984/".format(user, password, 'localhost'))


# Create tweets DB if it doesnt exist
dbname = 'tweets'

if dbname in server:
    db = server[dbname]
else:
    db = server.create(dbname)

# Create Front end DB
if 'front_end' in server:
    front_end_db = server['front_end']
else:
    front_end_db = server.create('front_end')

afn = Afinn()

# Store oldest tweet harvested for each SA4 query
tweet_sa4_min = {}

def push_tweets(sa4, api, min_id=None):
    processed_coord = sa4_coord[sa4]['processed_coord']
    coord = sa4_coord[sa4]['coord']

    if min_id is not None:
        str_id = str(min_id)
        tweets = tweepy.Cursor(api.search, geocode=processed_coord, max_id=str_id, lang='en').items(50)
    else:
        tweets = tweepy.Cursor(api.search, geocode=processed_coord, lang='en').items(50)

    id_list = []
    for tweet in tweets:
        doc_id = str(tweet.id)
        id_list.append(tweet.id)
        text = tweet.text
        score = afn.score(text)
        user = tweet.user._json['id_str']

        if doc_id not in db:
            db[doc_id] = {'text': text, 'sent_score': score, 'user': user, 'sa4': sa4, 'coord': coord,
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

def update_scores(db, front_end_db):
    min_max_scaler = preprocessing.MinMaxScaler()

    # Pull Sentiment Score and Tweet count from server

    tweet_counts = {}
    sent_sum = {}
    # Store Tweet Counts
    for code in db.view('Results/TweetCount', group='true'):
        tweet_counts[code.key] = code.value

    # Store Sentiment Scores
    for code in db.view('Results/SentimentSum', group='true'):
        sent_sum[code.key] = code.value

    # Calculate sentiment score and normalised sentiment score
    sentiment_score = {}
    for key in tweet_counts.keys():
        count = tweet_counts[key]
        sent = sent_sum[key]
        score = sent / count

        sentiment_score[key] = score

    # get saved json
    file = open('front_output.json', 'r').read()
    in_json = json.loads(file)

    # Update file
    for item in in_json:
        if item['sa4_code'] in sentiment_score.keys():
            key = item['sa4_code']
            item['sentiment_score'] = sentiment_score[key]
            item['sent_sum'] = sent_sum[key]
            item['tweet_counts'] = tweet_counts[key]

    # Check if output doc in front_end_db
    if 'output' in front_end_db:
        doc = front_end_db['output']
    else:
        doc_id, doc_rev = front_end_db.save({"_id": 'output'})
        doc = front_end_db[doc_id]
    # Put attachment to DB
    front_end_db.put_attachment(doc, in_json, 'out_data.json', "application/json")

# Run Loop
run_count = 0
while (True):
    run_count+=1
    print("Harvester:", HARVESTER_NUMBER, "run:", run_count, datetime.datetime.now())
    if HARVESTER_NUMBER == 1:
        print('Updating Scores')
        update_scores(db, front_end_db)
    for sa4 in code_to_process:
        try:
            push_tweets(sa4, api, tweet_sa4_min[sa4])
        except KeyError:
            push_tweets(sa4, api)
        except tweepy.TweepError:
            print("Pull Limit Reached, Sleeping for 15 Minutes")
            time.sleep(900)















