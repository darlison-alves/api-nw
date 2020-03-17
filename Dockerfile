FROM node:8.11.2-slim as builder

WORKDIR /var/www

RUN npm i -g typescript

# copy package.json and install dependecies
COPY package.json package.json

RUN npm install

COPY . .

RUN ["npm", "run", "compile"]

FROM node:8.11.2-slim as runtime

WORKDIR /var/www

# install dependencies to run node in docker
RUN npm install pm2 -g

#RUN timedatectl set-timezone America/Fortaleza

# Expose port 80
EXPOSE 80

# Copy code to directory current to container /var/www
COPY --from=builder /var/www/. .
RUN ./node_modules/.bin/tsc -p tsconfig.json

CMD ["pm2-docker", "build/App.js"]
