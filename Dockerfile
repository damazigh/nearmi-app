# production environment
FROM nginx:stable-alpine
RUN ls -lart /app
COPY /build/robots.txt /usr/share/nginx/html
COPY /build/* /usr/share/nginx/html
RUN ls -lart /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]