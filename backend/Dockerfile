FROM node:14.16.1-alpine
WORKDIR /usr/src/app
RUN apk add git
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
COPY process.yml /usr/src/app/process.yml
RUN npm ci
RUN npm install --only=production --silent
RUN npm install typeorm --silent
RUN npm install pm2 -g --silent
COPY . .
EXPOSE 8081
RUN npm run build

CMD ["pm2-runtime", "--max_old_space_size=1024", "process.yml"]