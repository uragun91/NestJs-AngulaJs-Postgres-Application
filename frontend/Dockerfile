# Stage 1
FROM node:14 as build-stage
WORKDIR /terramind-frontend
COPY package.json /terramind-frontend/package.json
RUN npm install
COPY . /terramind-frontend
RUN npm run build

# Stage 2
FROM nginx:1.17.0-alpine
COPY --from=build-stage /terramind-frontend/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 5000
CMD ["nginx", "-g", "daemon off;"]