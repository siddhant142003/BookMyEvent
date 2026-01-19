# ---------- BUILD STAGE ----------
FROM gradle:8.5-jdk21 AS build

WORKDIR /app

COPY build.gradle settings.gradle gradlew ./
COPY gradle ./gradle

# Download dependencies first (layer caching)
RUN ./gradlew dependencies --no-daemon

# Copy source
COPY src ./src

# Build JAR
RUN ./gradlew bootJar --no-daemon

# ---------- RUNTIME STAGE ----------
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]
