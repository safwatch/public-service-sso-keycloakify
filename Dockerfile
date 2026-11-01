# Stage 1: Build the theme JAR
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN apk add --no-cache openjdk17 maven
RUN yarn install --frozen-lockfile
RUN yarn build-keycloak-theme

# Stage 2: Keycloak + Theme + PostgreSQL Driver
FROM quay.io/keycloak/keycloak:22.0.5
WORKDIR /opt/keycloak

# Copy Keycloakify theme
COPY --from=build /app/dist_keycloak/keycloak-theme-for-kc-22-to-25.jar /opt/keycloak/providers/keycloak-theme.jar

# Tambahkan PostgreSQL driver
COPY postgresql-42.7.3.jar /opt/keycloak/providers/

# Copy entrypoint dan izinkan akses eksekusi
USER root
COPY entrypoint.sh /opt/keycloak/entrypoint.sh
RUN chmod +x /opt/keycloak/entrypoint.sh
USER 1000

ENTRYPOINT ["/opt/keycloak/entrypoint.sh"]

