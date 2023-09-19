# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application's source code to the container
COPY . .

# Expose the port your application will run on
EXPOSE 3200

# Define the command to start your application
CMD ["node", "app.js"]
