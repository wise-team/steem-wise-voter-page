FROM node:10.10-alpine

ADD . /src/
WORKDIR /src/

RUN npm install
RUN npm run build
RUN mv /src/dist/index.html /src/index.html

CMD npm run serve