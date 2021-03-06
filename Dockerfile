FROM node:16.9.1
#ENV NODE_ENV=production

WORKDIR /usr/app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .

CMD [ "node", "parser.js" ]
