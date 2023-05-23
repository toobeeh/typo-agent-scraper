# Use Node.js base image
FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the app code
COPY dist/ .

EXPOSE 3000

# Set environment variables (optional)
ENV NODE_ENV=production

# Start the app
CMD ["node", "index.js"]