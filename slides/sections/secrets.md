# Secrets

Create a secret in a Swarm:

```
echo "Passw0rd!" | docker sectet create db-password -
```

Defining secrets in the Docker Compose file:

```
version: '3.1'
services:
  app:
     image: gnschenker/pets-node:1.0
     ports:
       - 3000:3000
     secrets:
       - db-password
       - aws-api-key
       - aws-key-secret
...
```