FROM node:23-alpine

# Set working directory for all build stages.
WORKDIR /server

COPY package*.json .

RUN ["npm", "i"]

COPY . .

RUN ["npm", "run", "build"]

ENTRYPOINT ["/server/startup.sh"]
