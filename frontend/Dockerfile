# As build names this stage 
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Serve the front end with nginx (recommended for prodcution)
FROM nginx:alpine

# Copy your custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy only the final build, not source code.
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

