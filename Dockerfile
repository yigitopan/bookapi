# Stage 1: Build the application
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Install app dependencies
COPY package*.json tsconfig.json ./
RUN npm ci

# Copy app source code
COPY src ./src

# Build the application
RUN npm run build

# Stage 2: Create the production image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built application from the build stage
COPY --from=build /app/dist ./dist

# Expose the port
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]