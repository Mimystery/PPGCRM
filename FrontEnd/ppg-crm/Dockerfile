# Stage 1: build Angular app
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Stage 2: serve with nginx
FROM nginx:alpine
COPY --from=build /app/dist/ppg-crm /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
