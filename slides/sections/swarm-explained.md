## Swarm in Detail
![swarm](sections/images/raft-and-gossip.png)

Note:
* A swarm is a cluster of nodes with Docker Engine running
* Nodes are either bare metal or VMs
* Two roles, managers and workers
* Managers form a Raft consensus group
* Workers are supposed to execute tasks (run containers)
* Communication is secure via mutual TLS
* Swarm is HA due to redundancy
* Manager nodes replicate and are consistent or majority principle applies
* Worker nodes exchange state via gossip network and are eventual consistent