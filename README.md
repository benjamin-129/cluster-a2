# cluster-a2

Setup Instructions (Windows & WSL):

Using WSL:
-------------------------------------------------
Run Ansible Playbook:
source openrc.sh
ansible-playbook comp90024-a2.yaml



Using Powershell, ssh into Couchdb instances (x3)
-------------------------------------------------
Setup Volume Mount:
sudo mkfs -t ext4 /dev/vdb

Mount Volume:
sudo mkdir /couchdb
sudo mount /dev/vdb /couchdb

Build Dockerfile for each instance:
FROM couchdb:3.0.1
EXPOSE 5984
EXPOSE 4369
EXPOSE 9100

ENV COUCHDB_USER=admin
ENV COUCHDB_PASSWORD=password
ENV NODENAME=<Instance IP ADDRESS>


Build and run Docker CouchDB Instance:
sudo docker build -t cdb .
sudo docker run --name couchdb -p 4369:4369 -p 5984:5984 -p 9100:9100 -v /couchdb:/opt/couchdb/data -d cdb

SSH Tunnel into CouchDB Instance:
ssh -i benKP.pem -L localhost:15984:localhost:5984 ubuntu@<IP ADDRESS> -N

Setup Cluster Using GUI with IP of other nodes @ localhost:15984/_utils:
0: 45.113.232.142
1: 45.113.233.239
2: 45.113.233.207


Clone Repo:
git clone https://github.com/benjamin-129/cluster-a2.git


Install pip3 and Screen:
sudo apt-get update
sudo apt install python3-pip
sudo apt install screen

Install requirements for harvester:
cd cluster-a2/tweet_harvester
pip3 install -r requirements.txt

Run screen for each instance before running harvest:
screen

Run Harvest:
python3 harvest.py 0 localhost
python3 harvest.py 1 localhost
python3 harvest.py 2 localhost