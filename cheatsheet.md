# Cookbook

## Preparation

* Make sure you have `http-server` installed:

    ```
    npm install -g http-server
    ```

* Make sure you have this repo cloned:

    ```
    git clone https://github.com/gnschenker/pets-node.git
    ```

* Serve slides:

    ```
    cd pets-node/slides
    http-server
    ```

 * Open browser and navigate to `localhost:8080`

## Introduction

* Explain quickly what containers are and why they're cool
* Show Node app --> `server.js`, `index.html` and `server.js`

## Containerizing the App

* Create a `Dockerfile` and explain

    ```
    FROM node:latest
    COPY . /app
    RUN npm install
    CMD npm start
    ```

* Create an image:

    ```
    docker image build -t gnschenker/pets-node .
    ```

    explain...

* Run container:

    ```
    docker container run --rm -it -p 3000:3000 gnschenker/pets-node
    ```

* Show app: `localhost:3000`

* Tag image:

    ```
    docker image tag gnschenker/pets-node gnschenker/pets-node:1.0
    ```

* Push image:

    ```
    docker push gnschenker/pets-node:1.0
    ```

## Creating and Working with a Swarm

1. In PWD create a new swarm with 5 nodes (3 manager, 2 worker)
2. Explain HA, Raft, gossip network
3. Run Pets application as service:

    ```
    docker service create --name pets -p 3000:3000 gnschenker/pets-node:1.0
    ```

4. Show app and explain **Routing Mesh**
5. Scale service

    ```
    docker service update --replicas=3 pets
    ```

6. Change `index.html`, rebuild image, tag and push

    ```
    docker image build -t gnschenker/pets-node .
    docker image tag gnschenker/pets-node gnschenker/pets-node:2.0
    docker push gnschenker/pets-node:2.0
    ```

7. Back on swarm update service image:

    ```
    docker service update --update-parallelism=1 --update-delay=10s --image gnschenker/pets-node:2.0 pets
    ```

8. Watch the update

    ```
    docker service ps pets
    ```

## Stacks

1. Explain what a stack is and why we need it
2. Create stack file `stack.yml`:

    ```
    version: '3.1'
    services:
        app:
            image: gnschenker/pets-node:1.0
            ports:
                - 3000:3000
    ```

## Secrets

1. Create a secret:

    ```
    echo "Passw0rd!" | docker secret create db-password -
    ```

2. Use secrets in services. Modify stack file:

    ```
    version: '3.1'
    services:
        app:
            image: gnschenker/pets-node:1.0
            ports:
                - 3000:3000
            secrets:
                - db-password
    secrets:
        db-password:
            external: true
    ```

3. Exec into app container and show sectet in `/run/secrets`

## Reduce Friction in Development

1. First show tedious process of rebuild/restart container each time a change is made.
2. Introduce volume mounting:

    ```
    docker container run --rm -it -p 3000:3000 \
        -v $(pwd):/app \
        gnschenker/pets-node
    ```

3. Update the `index.html` and show that its picked up without container rebuild/restart
4. Make change in `server.js` and show it's not picked up
5. Introduce `nodemon` and add `Dockerfile.dev`:

    ```
    FROM node:latest
    RUN npm install -g nodemon
    COPY . /app
    RUN npm install
    CMD npm run start-dev
    ```

6. Build dev image:

    ```
    docker image build -f Dockerfile.dev -t pets-node-dev .
    ```

7. Run dev container:

    ```
    docker container run --rm -it \
        -p 3000:3000 \
        -v $(pwd):/app \
        pets-node-dev
    ```

8. Optimize the `Dockerfile` (and `Dockerfile.dev`):

    ```
    FROM node:latest
    RUN npm install -g nodemon
    COPY package.json /app/
    RUN npm install
    COPY . /app
    EXPOSE 3000
    CMD npm run start-dev
    ```

9. Explain `.dockerignore`
