# Stage 1: Build Angular Frontend
FROM node:22 AS ngbuild

WORKDIR /app/client

# Install Angular CLI globally
RUN npm install -g @angular/cli@19.2.1

# Copy ONLY necessary files for npm install (for caching)
COPY ecommerce/client/package*.json ./
COPY ecommerce/client/angular.json ./
COPY ecommerce/client/tsconfig*.json ./

# Install dependencies (using npm ci for consistency)
RUN npm ci

# Copy the entire source code (after dependency installation)
COPY ecommerce/client/src ./src

# Build the Angular app with verbose output
RUN ng build --verbose

# Stage 2: Build Spring Boot Backend
FROM openjdk:23 AS javabuild

WORKDIR /app

# Copy Maven files
COPY ecommerce/pom.xml .
COPY ecommerce/.mvn/ .mvn/
COPY ecommerce/mvnw .
COPY ecommerce/src ./src

# Copy Angular build artifacts to static resources.  Corrected path!
COPY --from=ngbuild /app/client/dist/client-side ./src/main/resources/static

# Build Spring Boot application
RUN chmod a+x mvnw
RUN ./mvnw package -Dmaven.test.skip=true

# Stage 3: Final Runtime Image
FROM openjdk:23

WORKDIR /app

# Copy the built jar file from the build stage
COPY --from=javabuild /app/target/*.jar app.jar

# Set environment variables
ENV PORT=8080

# Expose the port
EXPOSE ${PORT}

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]