# Team-42: James Sammut (502030) Andrzej Poniatowski (1048535) 
# Matthew Lim (895507) Benjamin Tam (889835) Xinyue Hu (1147042) 

import pycouchdb
import credentials
import couchdb

# Try couchdb again.,

COUCH_ADDRESS = "localhost"
# variables from git ignored creds.py file
user = credentials.dbuser
password = credentials.dbpassword


# server = pycouchdb.Server("http://{}:{}@{}:5984/".format(user, password, COUCH_ADDRESS))

server = couchdb.Server("http://{}:{}@{}:5984/".format(user, password, COUCH_ADDRESS))


dbname = 'tweets'

if dbname in server:
    db = server[dbname]
else:
    db = server.create(dbname)



# Make new DB if its not already there
# dbname = 'tweets'
# try:
#     db = server.database(dbname)
# except:
#     server.create(dbname)
#     db = server.database(dbname)



# Add item to DB
# db.save({"hello" : "123"})

# Update Document

# Query DB
# map_func = "function(doc) { emit(doc.name, 1); }"

# print(list(db.all()))

# list(db.query(map_func))



# print(server.database("_all_dbs")
