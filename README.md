# cluster-a2

Updated Instructions:

#### MAKE SURE ALL ROLES IN PLAYBOOK ARE UNHASHED ##########

Go to ansible directory, make sure benKP.pem is in same directory.

In Bash:

source openrc.sh
export ANSIBLE_HOST_KEY_CHECKING=False
sudo -E ansible-playbook comp90024-a2.yaml --private-key benKP.pem -k
