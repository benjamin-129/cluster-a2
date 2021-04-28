import pycouchdb
import creds

# Try couchdb again.,

COUCH_ADDRESS = "localhost"
# variables from git ignored creds.py file
user = creds.dbuser
password = creds.dbpassword


server = pycouchdb.Server("http://{}:{}@{}:5984/".format(user, password, COUCH_ADDRESS))

db = None
# Make new DB if its not already there
try:
    db = server.database("tweets")
except:
    server.create("tweets")
    db = server.database("tweets")



# Add item to DB
# db.save({"hello" : "123"})

# Update Document

# Query DB
map_func = "function(doc) { emit(doc.name, 1); }"

# print(list(db.all()))

list(db.query(map_func))



# print(server.database("_all_dbs")
