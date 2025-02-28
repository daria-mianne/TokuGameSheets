FROM node:23-alpine

ARG NPM_CMD
ENV NPM_CMD=${NPM_CMD}

RUN echo $NPM_CMD

WORKDIR /client

COPY package*.json .

RUN ["npm", "i"]

COPY . .

# Run the application as a non-root user.
# USER node

# Expose the port that the application listens on.
# EXPOSE 5173

# Run the application.
ENV FROMDOCKER=true
CMD npm run-script $NPM_CMD
# TODO: figure out how to get a proper run command that preserves the behavior
# of making API calls to port 5000 instead of port 5173
# FROM busybox:latest as runner
# CMD ["busybox", "httpd", "-f", "-v", "-p", "5173"]