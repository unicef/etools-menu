FROM node:14.21-alpine3.16  as builder
RUN apk update
RUN apk add --update bash

RUN apk add git
RUN npm install -g typescript@4.9.5


WORKDIR /tmp
ADD package.json /tmp/
ADD package-lock.json /tmp/

RUN npm ci --only=prod

ADD . /code/
WORKDIR /code
RUN rm -rf node_modules
RUN cp -a /tmp/node_modules /code/node_modules

# Necessary for circle ci
WORKDIR /code
RUN git submodule init && git submodule update --checkout

RUN npm run build


FROM node:14.21-alpine3.16 
RUN apk update
RUN apk add --update bash

WORKDIR /code
RUN npm install express --no-save
RUN npm install compression --no-save
RUN npm install browser-capabilities@1.1.x --no-save
COPY --from=builder /code/express.js /code/express.js
COPY --from=builder /code/src /code/src
EXPOSE 8080
CMD ["node", "express.js"]
