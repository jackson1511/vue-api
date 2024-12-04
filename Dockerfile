# Step 1: Use an official Node.js image as the build environment
FROM node:16 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the Vue.js app for production
RUN npm run build

# Step 2: Use Nginx to serve the built app
FROM nginx:alpine

# Copy the build output from the previous step to the Nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for web traffic
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
