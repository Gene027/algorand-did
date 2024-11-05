FROM node:lts-alpine

ADD . /home/node/app

WORKDIR /home/node/app

COPY .env /home/node/app/.env

RUN \
  npm install

EXPOSE 9090

ENTRYPOINT [ "/home/node/app/run.sh" ]

