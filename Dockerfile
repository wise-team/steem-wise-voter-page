#§ 'FROM node:' + data.config.npm.node.version + '-alpine'
FROM node:9.11-alpine


ADD . /src/
WORKDIR /src/

RUN npm install
RUN npm run build

CMD npm run serve
