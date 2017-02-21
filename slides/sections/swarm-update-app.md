## Update the Application
On master run again:

```
docker stack deploy -c my-app.yml
```

with updated `my-app.yml`:

```
version: '3.1'
services:
    image: gnschenker/pets-node:2.0
...
```
