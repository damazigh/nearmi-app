# production environment
FROM nginx:stable-alpine
RUN ls -lart
RUN pwd
COPY build /usr/share/nginx/html
RUN ls -lart /usr/share/nignx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]y