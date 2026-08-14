# Frontend: build with Vite, serve with nginx (SPA fallback included).
# VITE_API_URL defaults to the live backend; Dokploy env var overrides it at build.

FROM node:24-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ARG VITE_API_URL=https://backend-jaktrip.rexensoft.com
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
