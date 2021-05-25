# Team-42: James Sammut (502030) Andrzej Poniatowski (1048535) 
# Matthew Lim (895507) Benjamin Tam (889835) Xinyue Hu (1147042) 

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
server = couchdb.Server("http://{}:{}@{}:5984/".format(user, password, COUCH_ADDRESS))


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

    # Normalise Scores and Counts
    normalised_sent = []
    normalised_counts = []
    normalised_sum = [] 

    for sa4, value in sentiment_score.items():
        normalised_sent.append([sa4,value])
    for sa4, value in tweet_counts.items():
        normalised_counts.append([sa4,value])
    for sa4, value in sent_sum.items():
        normalised_sum.append([sa4,value])

    sent_scaled_val = min_max_scaler.fit_transform(np.array(normalised_sent)[:, 1].reshape(-1, 1))
    count_scaled_val = min_max_scaler.fit_transform(np.array(normalised_counts)[:, 1].reshape(-1, 1))
    sum_scaled_val = min_max_scaler.fit_transform(np.array(normalised_sum)[:, 1].reshape(-1, 1))
    
    for i, v in enumerate(sent_scaled_val):
        normalised_sent[i].append(v[0])
    for i, v in enumerate(count_scaled_val):
        normalised_counts[i].append(v[0])
    for i, v in enumerate(sum_scaled_val):
        normalised_sum[i].append(v[0])

    # Add back into original dict

    for item in normalised_sent:
        if item[0] in sentiment_score:
            sentiment_score[item[0]] = [round(item[1],2), round(item[2],2)]

    for item in normalised_counts:
        if item[0] in tweet_counts:
            tweet_counts[item[0]] = [round(item[1],2), round(item[2],2)]

    for item in normalised_sum:
        if item[0] in sent_sum:
            sent_sum[item[0]] = [round(item[1],2), round(item[2],2)]


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

# REFERENCES
# 
# Ansible 2021, Loops, viewed 1st May 2021, 
# <https://docs.ansible.com/ansible/latest/user_guide/playbooks_loops.html#iterating-over-a-simple-list>.
# 
# Ansible 2021, os_security_group_rule - Add/Delete rule from an existing security group, viewed 1st May 2021, 
# <https://docs.ansible.com/ansible/2.5/modules/os_security_group_rule_module.html>.
# 
# Ansible 2021, os_server - Create/Delete Compute Instances from Openstack, viewed 25th April 2021, <https://docs.ansible.com/ansible/2.4/os_server_module.html>.
# 
# Ansible 2021, Tags, viewed 25th April 2021, 
# <https://docs.ansible.com/ansible/latest/user_guide/playbooks_tags.html>.
# 
# Apache Software Foundation 2021, 2.2/ Cluster Setup, viewed 1st May 2021,
# <https://docs.couchdb.org/en/stable/setup/cluster.html>.
# 
# AURIN 2018, comp90024 Code snippets for the Cloud Computing Course, viewed 23 April 2021, <https://github.com/AURIN/comp90024>.
# 
# AURIN 2021, Australian Urban Research Infrastructure Network Portal, viewed 11 May 2021, 
# <https://portal.aurin.org.au/>.
# 
# Australian Bureau of Statistics 2016, Main Structure and Greater Capital City Statistical Areas -  Australian Statistical Geography Standard (ASGS): Volume 1, viewed 8th May 2021,
# <https://www.abs.gov.au/ausstats/abs@.nsf/mf/1270.0.55.001>.
# 
# Eisenkot, G 2020, Security challenges and risks with infrastructure as code, viewed 21st May 2021,
# <https://bridgecrew.io/blog/security-challenges-and-risks-with-infrastructure-as-code/>.
# 
# Harrower, M. and Bloch, M., 2006. MapShaper. org: A map generalization web service. IEEE Computer Graphics and Applications, 26(4), pp.22-27.
# 
# Internet Assigned Numbers Authority 2021, Service Name and Transport Protocol Port Number Registry, viewed 1st May 2021, <https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?search=http>.
# 
# JGraph 2021, diagrams.net, viewed 1st April 2021, 
# <https://www.diagrams.net>.
# 
# Nielsen, FÅ 2017. afinn project, Technical University of Denmark, Kongens Lyngby, viewed 25th April 2021, <http://www2.imm.dtu.dk/pubdb/edoc/imm6975.pdf>.
# 
# Pan, A 2021, Workshop 9-10 Ansible, The University of Melbourne, Parkville, viewed 24th April 2021, <https://canvas.lms.unimelb.edu.au/courses/105440/files/7077574/download?download_frd=1>.
# 
# Pan, A 2021, Workshop 9-10 Ansible Code, The University of Melbourne, Parkville, viewed 24th April 2021, <https://canvas.lms.unimelb.edu.au/files/7112800/download?download_frd=1>.
# 
# The University of Melbourne 2021, Melbourne Research Cloud, viewed 23rd April 2021, <https://dashboard.cloud.unimelb.edu.au/auth/login/>.
# 
# The University of Melbourne 2021, Re:Cite, viewed 21st May 2021, 
# <https://library.unimelb.edu.au/recite>.
# 
# Tinati, R., Halford, S., Carr, L. and Pope, C., 2014. Big data: methodological challenges and approaches for sociological analysis. Sociology, 48(4), pp.663-681. Viewed 21st May 2021,
# <https://www.jstor.org/stable/24433725>.
# 
# Tutorials Point 2021, YAML - Comments, viewed 1st May 2021, 
# <https://www.tutorialspoint.com/yaml/yaml_comments.htm>.
# 
# Vasiljevic, S 2020, Infrastructure As Code Demystified: IaC Benefits, Challenges and Best Practices, viewed 21st May 2021, 
# <https://superadmins.com/infrastructure-as-code-demystified-iac-benefits-challenges-best-practices/>.













