#syntax=docker/dockerfile:1.4
FROM node:lts-alpine as dev

# make the 'app' folder the current working directory
WORKDIR /srv/app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# install project dependencies
RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev"]
