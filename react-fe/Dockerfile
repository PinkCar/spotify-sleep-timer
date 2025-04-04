# Step 1: Use an official Node.js runtime as the base image
FROM node:16-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY ./build ./build

# Step 7: Serve the app using a simple HTTP server (e.g., serve)
RUN npm install -g serve

# Step 8: Expose the port the app will run on
EXPOSE 3000

# Step 9: Command to run the app
CMD ["npx", "serve", "-s", "./build", "-l", "3000"]