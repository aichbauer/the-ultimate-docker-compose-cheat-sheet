# the next line sets the base image for this image
# the base image is also based on an Dockerfile
# see: https://hub.docker.com/layers/library/node/18-alpine/images/sha256-a0b787b0d53feacfa6d606fb555e0dbfebab30573277f1fe25148b05b66fa097
# node provides offical images for nodejs and alpine
# is used as a lightweight linux distribution
# to reduce image size
FROM node:18-alpine

# we update the package list so that we always install
# the latest version of a package
RUN apk update && apk upgrade --no-cache
# we install tini to have a proper init process
# see: https://github.com/krallin/tini
# this is needed to properly handle signals
# like SIGTERM and SIGINT to stop and kill the container
RUN apk add --no-cache tini
# Tini is now available at /sbin/tini
ENTRYPOINT ["/sbin/tini", "--"]

# sets the working directory inside the image
# all commands after this insturction will be
# executed inside this directory
WORKDIR /app

# copies the package.json and package-lock.json
# from the client (e.g. your server or your development machine)
# into the /app directory inside the image
# this is done before running npm ci to
# get the advantage of layer caching
COPY ./package* .

# installs all node.js dependencies
# npm ci is similar to npm install but intended to be
# used in continuous integration (CI) environments
# it will do a clean install based on the package-lock.json
RUN npm ci

# copies the source code into the image
COPY . .

# this runs the build command specified in the package.json
RUN npm run build:server

# does nothing
# this is documentation so that we know which port is used for that image
EXPOSE 3000

# executes the server.js file that is located in the build directory
CMD ["node", "./build/index.js"]
