ARG JAVA_VERSION=17
FROM openjdk:${JAVA_VERSION}
COPY target/ogr.war ogr.war
EXPOSE 8080
CMD ["java","-jar","/ogr.war"]
