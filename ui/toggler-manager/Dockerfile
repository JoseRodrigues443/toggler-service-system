FROM node:9.6.1

RUN mkdir client

WORKDIR /client 

COPY package.json /client/package.json

RUN npm i

COPY . /client

RUN npm run build

CMD ["npm", "start"]