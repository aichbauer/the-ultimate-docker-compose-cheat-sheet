<p align="center">
  <a href="https://devopscycle.com">
    <img target="_blank" height="100" src="http://devopscycle.com/wp-content/uploads/sites/4/2023/10/DevOps-Cycle-Logo-Long.png" />
  </a>
</p>

# The Ultimate Docker Compose Cheat Sheet

> Learn Docker Compose

The content of this repository can guide you to learn to use Docker Compose. Here is the accompanying blog article: [The Ultimate Docker Compose Cheat Sheet](https://devopscycle.com/blog/the-ultimate-docker-compose-cheat-sheet) with the [PDF](https://devopscycle.com/wp-content/uploads/sites/4/2024/03/the-ultimate-docker-compose-cheat-sheet.pdf) or an [image](https://devopscycle.com/wp-content/uploads/sites/4/2024/03/the-ultimate-docker-compose-cheat-sheet.png) to the Docker Compose Cheat Sheet. If you need a refresher on Docker itself you can read this article: [The Ultimate Docker Cheat Sheet](https://devopscycle.com/blog/the-ultimate-docker-cheat-sheet). This repository is intended for corporate trainings, university courses and all people (mainly developers and system administrators, but also QA, security experts) that are interested into learning DevOps and especially in automating their processes and tasks to improve the iteration speed, the quality of their work output, and the overall transparancy in their company.

## Why?

It is hard getting started with the technical implementation of DevOps tools. Sharing Knowledge is an important part in DevOps and this is why this repository exists. This repository should give you some guidance on how you can start. This is by no means a silver bullet and also never finished. Another important part is continuous imporvement. You could use this repository as entrypoint for an internal hackathon at your company or your university. Feel free to share your results and learnings as a pull request to this repository.

Before you start with automating the product lifecycle and implementation of DevOps tools, you should have the correct foundation.

Start with the culture and the mindset.

You get a slighty different definition for DevOps when you look at different websites, but the intersection is always culture or the cultural philosophy. So get the key principles straight, then you will be able to profit from the technical tools as well:

* Colloboration & Communication
* Continuous Improvement
* Automation of the Product Lifecycle
* Customer Centric Action & Short Feedback Loops

Here are some good resources to get started with colloboration, communication and continuous imporvment:

* [https://dora.dev/devops-capabilities/cultural/generative-organizational-culture/](https://dora.dev/devops-capabilities/cultural/generative-organizational-culture/)
* [https://dora.dev/devops-capabilities/cultural/learning-culture/](https://dora.dev/devops-capabilities/cultural/learning-culture/)

## Prerequistits

* [Docker](https://docs.docker.com/install/)
* [Docker Compose](https://docs.docker.com/compose/install/) (if you install Docker Desktop, it comes out of the box)
* [Node.js](https://nodejs.org/)

## Apps

In this section you will get an overview of the applications in this repository.

### Client

The client application consits of a HTML and a JS file. The app makes a HTTP Get request to the server application to get all messages and displays them in an unordered list. The App has also an button, which you can click to make a HTTP POST request to add a new message on the server. The server responds with the new message and the client appends the newly created message to the unordered list. The client is located at `./src/client`.

You can visit [http://localhost](http://localhost) to see the client in action.

## Development

In this section you will get an overview of how you can start the client in development.

### Start

```sh
# start development
# you need to cancel and restart this cmd
# if you want to see changes that you make to the client
# you can visit http://localhost now to see the client in action
$ npm run start:client
```

## Production

In this section you will get an overview of how you can start the client in production.

### Start

This command will start all required containers (client, server, database).

You can visit [http://localhost](http://localhost) to see the client in action.

```sh
# make sure you are in the project's root directory
# where the docker-compose.yaml is located
# you can visit http://localhost now to see the client in action
$ docker compose up --detach
# if you run this command without the --detach flag
# you will start all containers in a foreground process
# the containers will stop as soon as you kill the terminal
# or when you press CTRL+C
```

### Stop

This command will stop all containers (client, server, database).

```sh
# make sure you are in the project's root directory
# where the docker-compose.yaml is located
$ docker compose stop
```

### Stop & Remove

This command will stop and remove all containers (client, server, database).

```sh
# make sure you are in the project's root directory
# where the docker-compose.yaml is located
$ docker compose down --detach
```

### Server

The server consists of a single JS file. It hosts a simple Fastify app with two routes `GET /` and `POST /`.
The GET route will make a request to a Postgres database to get all messages. The POST route will add a new entry to the messages in the Postgres database. On start up of the server it will create a new table called messages in the Postgres database with the fields id (auto increment integer [serial]) and message (text). The server app is located in `./src/server` directory.

You can visit [http://localhost:3000](http://localhost:3000) to see the server in action.

The JSON respond from the server looks like:

```json
{
  "messages": [
    {
      "id": 0,
      "message": "Hello World"
    }
  ]
}
```

## Development

In this section you will get an overview of how you can start the server in development.

> NOTE: currently the connection string for the database is hard coded, which means you need to update this string manually if you want to run it without docker compose.

### Start

```sh
# start development
# you need to cancel and restart this cmd
# if you want to see changes that you make to the server
# you can visit http://localhost:3000 now to see the client in action
$ npm run start:server
```

## Production

In this section you will get an overview of how you can start the server in production.

### Start

This command will start all required containers (client, server, database).

You can visit [http://localhost:3000](http://localhost:3000) to see the server in action.

```sh
# make sure you are in the project's root directory
# where the docker-compose.yaml is located
# you can visit http://localhost:3000 now to see the client in action
$ docker compose up --detach
# if you run this command without the --detach flag
# you will start all containers in a foreground process
# the containers will stop as soon as you kill the terminal
# or when you press CTRL+C
```

### Stop

This command will stop all containers (client, server, database).

```sh
# make sure you are in the project's root directory
# where the docker-compose.yaml is located
$ docker compose stop --detach
```

### Stop & Remove

This command will stop and remove all containers (client, server, database).

```sh
# make sure you are in the project's root directory
# where the docker-compose.yaml is located
$ docker compose down --detach
```

## LICENSE

MIT @ Lukas Aichbauer
