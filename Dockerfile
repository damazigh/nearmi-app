# build environment
FROM node:lts as build
LABEL stage=builder
WORKDIR /app
ENV TARGET_ENV=dev
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm  install react-scripts@3.4.1 -g --silent
COPY . ./.
RUN npm run build:${TARGET_ENV}

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]