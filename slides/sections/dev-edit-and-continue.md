# Edit & Continue

Add this to the `Dockerfile`:

```
RUN npm install -g nodemon```

Mounting volume with source code:

```
docker container run --rm -it \
    -p 3000:3000 \
    -v $(pwd):/app
    gnschenker/pets-node npm run start-dev
```

with the command `start-dev` defined as:

```
nodemon ./server.js 0.0.0.0 3000
```