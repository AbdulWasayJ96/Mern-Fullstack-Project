FROM node:18-alpine

# ^^ Node Js 18, apline linux (very small and fast)= Perfect for ecs

WORKDIR /app

# ^^ It will create a working directory for app in the container

COPY package*.json ./

# ^^ Docker caching layers, it will only install dependencies if with package.json is updated or changed


RUN npm install --production 

# ^^ Install all the dependencies

COPY . .

# ^^ Copy the rest of the code in the container

EXPOSE 5000

# Tell docker which port the app uses


CMD ["node", "server.js"]

# ^^ Command to run app
