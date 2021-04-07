# build environment
FROM node:lts as build
LABEL stage=builder
WORKDIR /app
COPY /build .

# production environment
FROM nginx:stable-alpine
RUN ls -lart /app
COPY --from=build /app/build /usr/share/nginx/html
RUN ls -lart /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]