FROM node:18-alpine AS build

# Create app directory
WORKDIR /usr/src/app

# Add `/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./

# Installs all node packages
RUN npm install

# Copy everything over to Docker environment
COPY src .
COPY .env .

CMD [ "node", "./index.js" ]
