# Stage 1: Build the application using OpenJDK 21 (LTS)
# Using 'slim' image for smaller size and relying on the Maven Wrapper (mvnw)
FROM openjdk:21-jdk-slim AS build
WORKDIR /app

# Copy Maven wrapper, configuration, and pom.xml
# This creates a caching layer for dependencies
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Make wrapper executable and download dependencies
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline

# Copy source code and build
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Stage 2: Create the smallest final image with JRE
# Using Temurin 21 JRE on Alpine for maximum size reduction and security.
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy the generated JAR from the build stage
# The JAR name is assumed to be the only one in /target
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]