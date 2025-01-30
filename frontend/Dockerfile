# Use Node.js as the base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Start the frontend server
CMD ["npm", "run", "dev"]
