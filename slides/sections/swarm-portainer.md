### Manage Swarm using Portainer
On master node run:

```
docker run -d -p 9000:9000 portainer/portainer -H tcp://<SWARM_MANAGER_IP>:2375
```

![portainer](sections/images/portainer.png)