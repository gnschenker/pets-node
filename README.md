# pets-node
Slides and sample code for presentation at NodeJS Meetup Austin - Feb. 2017

## Running the slide show
To run the slides open a terminal and navigate to the `slides` folder. Serve `index.html` with a web server, e.g. [http-server](https://www.npmjs.com/package/http-server).

## Running the application
**Prerequisites:** I am assuming that you're using [Docker for Mac/Windows](https://www.docker.com/products/docker)

To run the app navigate to the `app` folder and run

    docker container run --rm -it -p 3000:3000 gnschenker/pets-node:latest

Open a browser at `localhost:3000` to view the cat images.

Enjoy!
