## COMP90024 - Cluster and Cloud Computing ##
Assignment #2 - City Analytics on the Cloud

## Team 42 ##
- James Sammut (502030)
- Andrzej Poniatowski (1048535)
- Matthew Lim (895507)
- Benjamin Tam (889835)
- Xinyue Hu (1147042)

## Abstract ##
The goal of our study was to determine whether a correlation exists between wealth and happiness in Australia. Due to a lack of surveys measuring self-reported citizen happiness, we chose to use an approach of Tweet text sentiment analysis to determine the happiness levels across Australia. Overall, our study found no correlation between these two variables.

- Analysis: https://youtu.be/gw_DLllSDd0 
- Deployment: https://www.youtube.com/watch?v=zBW-AfO5RiA

------------------------------------------------------------------------------------
Instructions to run:

Go to the ansible directory, make sure MRC key is in same directory.
Place <<KEY_NAME>>.pem in the ansible directory and navigate to ansible/variables/hosts/hosts.yaml and replace benKP with <<KEY_NAME>>.

Ensure path to python interpreter is appropriate for your system. This can be changed in ansible/comp90024-a2.yaml

## In Bash/ WSL ##
source openrc.sh
export ANSIBLE_HOST_KEY_CHECKING=False
sudo -E ansible-playbook comp90024-a2.yaml --private-key <<KEY_NAME>>.pem -k
