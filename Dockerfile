FROM node:10.10-alpine

ADD . /src/
WORKDIR /src/

RUN npm install
RUN npm run build

CMD npm run serve
