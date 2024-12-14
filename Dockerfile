# Use the Node.js 20.5.1 base image
FROM node:20.5.1

# Set the working directory
WORKDIR /app

# Copy package.json and install all dependencies
COPY package*.json ./

# Copy only package.json and package-lock.json first for efficient caching
COPY . .

# Copy the .env file into the container
COPY .env .env

# Install only production dependencies
RUN npm install 

# Expose the port the app runs on (e.g., 3000)
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]