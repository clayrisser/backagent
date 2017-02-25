############################################################
# Dockerfile to run deputy
# Based on node
############################################################

FROM node:latest

MAINTAINER Jam Risser (jamrizzi)

EXPOSE 3000

ENV NODE_ENV production
ENV CONTENT_PATH /content
ENV GIT_USERNAME ""
ENV GIT_PASSWORD ""
ENV GIT_REPO ""
ENV GIT_BRANCH origin/master
ENV TINI_VERSION v0.14.0

WORKDIR /app/

ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /bin/tini
RUN chmod +x /bin/tini

COPY ./package.json /app/package.json
RUN npm install
COPY ./ /app/
RUN chmod -R 700 /app/

ENTRYPOINT ["tini", "--"]
CMD ["node", "server.js"]
