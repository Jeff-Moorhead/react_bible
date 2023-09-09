FROM node:18-alpine

WORKDIR /react_bible/
COPY public/ /react_bible/public
COPY src/ /react_bible/src
COPY package.json /react_bible/

RUN npm install
RUN npm run build
RUN npm install -g serve

CMD ["serve", "-s", "build"]