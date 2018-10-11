#§ 'FROM node:' + data.config.npm.node.version + '-alpine'
FROM node:9.11-alpine


ADD . /src/
WORKDIR /src/

RUN npm install
RUN NODE_ENV=production npm run build | tr -d '{}[]'

CMD npm run serve

##§ '\n' + data.config.docker.generateDockerfileFrontMatter(data) + '\n' §##
LABEL maintainer="The Wise Team (https://wise-team.io/) <jedrzejblew@gmail.com>"
LABEL vote.wise.wise-version="1.2.2"
LABEL vote.wise.license="MIT"
LABEL vote.wise.repository="steem-wise-voter-page"
##§ §.##