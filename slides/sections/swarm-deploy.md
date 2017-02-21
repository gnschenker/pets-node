## Deploy an Application
On a Swarm master:

```
docker stack deploy -c my-stack.yml
```

with `my-stack.yml`:

```
version: '3.1'
services:
  app:
    image: gnschenker/pets-node:1.0
    ports:
        - 3000:3000
    deploy:
        replicas: 2
    restart_policy:
        condition: on-failure
    update_policy:
        parallelism: 1
        delay: 10s
```
