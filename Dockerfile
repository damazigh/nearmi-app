# production environment
FROM nginx:stable-alpine
RUN ls -lart
RUN pwd
COPY /builds/nearmi1/nearmi-app/build /usr/share/nginx/html
RUN ls -lart /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]y