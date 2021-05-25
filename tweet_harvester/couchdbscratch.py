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

# REFERENCES
# 
# Ansible 2021, Loops, viewed 1st May 2021, 
# <https://docs.ansible.com/ansible/latest/user_guide/playbooks_loops.html#iterating-over-a-simple-list>
# 
# Ansible 2021, os_security_group_rule - Add/Delete rule from an existing security group, viewed 1st May 2021, 
# <https://docs.ansible.com/ansible/2.5/modules/os_security_group_rule_module.html>
# 
# Ansible 2021, os_server - Create/Delete Compute Instances from Openstack, viewed 25th April 2021, <https://docs.ansible.com/ansible/2.4/os_server_module.html>
# 
# Ansible 2021, Tags, viewed 25th April 2021, 
# <https://docs.ansible.com/ansible/latest/user_guide/playbooks_tags.html>.
# 
# Apache Software Foundation 2021, 2.2/ Cluster Setup, viewed 1st May 2021,
# <https://docs.couchdb.org/en/stable/setup/cluster.html>.
# 
# AURIN 2021, Australian Urban Research Infrastructure Network Portal, viewed 11 May 2021, 
# <https://portal.aurin.org.au/>
# 
# Australian Bureau of Statistics 2016, Main Structure and Greater Capital City Statistical Areas -  Australian Statistical Geography Standard (ASGS): Volume 1, viewed 8th May 2021,
# <https://www.abs.gov.au/ausstats/abs@.nsf/mf/1270.0.55.001> 
# 
# Eisenkot, G 2020, Security challenges and risks with infrastructure as code, viewed 21st May 2021,
# <https://bridgecrew.io/blog/security-challenges-and-risks-with-infrastructure-as-code/>
# 
# Harrower, M. and Bloch, M., 2006. MapShaper. org: A map generalization web service. IEEE Computer Graphics and Applications, 26(4), pp.22-27.
# 
# Internet Assigned Numbers Authority 2021, Service Name and Transport Protocol Port Number Registry, viewed 1st May 2021, <https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?search=http>.
# 
# JGraph 2021, diagrams.net, viewed 1st April 2021, 
# <https://www.diagrams.net>.
# 
# Nielsen, FÅ 2017. afinn project, Technical University of Denmark, Kongens Lyngby, viewed 25th April 2021, <http://www2.imm.dtu.dk/pubdb/edoc/imm6975.pdf>
# 
# Pan, A 2021, Workshop 9-10 Ansible, The University of Melbourne, Parkville, viewed 24th April 2021, <https://canvas.lms.unimelb.edu.au/courses/105440/files/7077574/download?download_frd=1>.
# 
# Pan, A 2021, Workshop 9-10 Ansible Code, The University of Melbourne, Parkville, viewed 24th April 2021, <https://canvas.lms.unimelb.edu.au/files/7112800/download?download_frd=1>.
# 
# The University of Melbourne 2021, Melbourne Research Cloud, viewed 23rd April 2021, <https://dashboard.cloud.unimelb.edu.au/auth/login/>
# 
# The University of Melbourne 2021, Re:Cite, viewed 21st May 2021, 
# <https://library.unimelb.edu.au/recite>.
# 
# Tinati, R., Halford, S., Carr, L. and Pope, C., 2014. Big data: methodological challenges and approaches for sociological analysis. Sociology, 48(4), pp.663-681. Viewed 21st May 2021,
# <https://www.jstor.org/stable/24433725>
# 
# Tutorials Point 2021, YAML - Comments, viewed 1st May 2021, 
# <https://www.tutorialspoint.com/yaml/yaml_comments.htm>.
# 
# Vasiljevic, S 2020, Infrastructure As Code Demystified: IaC Benefits, Challenges and Best Practices, viewed 21st May 2021, 
# <https://superadmins.com/infrastructure-as-code-demystified-iac-benefits-challenges-best-practices/