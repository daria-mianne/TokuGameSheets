FROM node:23-alpine

WORKDIR /client

COPY package*.json .

RUN ["npm", "i"]

COPY . .

# Run the application as a non-root user.
# USER node

# Expose the port that the application listens on.
# EXPOSE 5173

# Run the application.
CMD ["npm", "run", "dev"]
# TODO: figure out how to get a proper run command that preserves the behavior
# of making API calls to port 5000 instead of port 5173
# FROM busybox:latest as runner
# CMD ["busybox", "httpd", "-f", "-v", "-p", "5173"]