FROM node:8.12-alpine

ADD . /src/
WORKDIR /src/

RUN npm install
RUN npm rebuild node-sass  # weird error without that
RUN npm run build

CMD npm run serve