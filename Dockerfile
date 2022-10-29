FROM tomcat:9.0-alpine
RUN apk add --update git && \
    git clone https://github.com/a1qatraineeship/docker_task.git /usr/local/tomcat/webapps/docker
CMD ["catalina.sh", "run"]