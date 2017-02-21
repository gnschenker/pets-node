## Create a Swarm

* We're using [play with Docker](www.play-with-docker.com)
* Start a session and create 5 nodes
* On first node run:<br> `docker swarm init ...` 
* Other nodes:<br> `docker swarm join ...`

Note:
* We simulate our infrastructure, e.g. a cluster of VMs in Azure or AWS using **Play with Docker**.
* A swarm is initialized with the command `docker swarm init --advertise-addr <IP-address>`
* A node can join the swarm by knowing a secret token and using the command `docker swarm join ...`
* We can get the token from the swarm controller with `docker swarm join-token <role>`

