# Use Node.js 22 base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy all source files
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["npx", "tsx", "apps/api/index.ts"]