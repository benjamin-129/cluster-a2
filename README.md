## COMP90024 - Cluster and Cloud Computing ##
Assignment #2 - City Analytics on the Cloud

## Team 42 ##
- James Sammut (502030)
- Andrzej Poniatowski (1048535)
- Matthew Lim (895507)
- Benjamin Tam (889835)
- Xinyue Hu (1147042)

## Abstract ##
The goal of our study was to determine whether there exists a correlation between wealth and happiness in Australia. Due to a lack of surveys measuring self-reported citizen happiness, we chose to use an approach of Tweet text sentiment analysis to determine the happiness levels across Australia. Our study has found no correlation between these two variables.

- Analysis: https://youtu.be/gw_DLllSDd0 
- Deployment: https://www.youtube.com/watch?v=zBW-AfO5RiA

------------------------------------------------------------------------------------
Instructions to run:

#### MAKE SURE ALL ROLES IN PLAYBOOK ARE UNHASHED ##########

Go to ansible directory, make sure benKP.pem is in same directory.

If using a different key, place <<KEY_NAME>>.pem in the ansible directory and navigate to ansible/variables/hosts/hosts.yaml and replace benKP with the new key name.

Ensure path to python interpreter is appropriate for your device. This can be changed in ansible/comp90024-a2.yaml

## In Bash/ WSL ##
source openrc.sh
export ANSIBLE_HOST_KEY_CHECKING=False
sudo -E ansible-playbook comp90024-a2.yaml --private-key <<KEY_NAME>>.pem -k
