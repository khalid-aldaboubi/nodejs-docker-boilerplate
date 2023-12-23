# Create a new build stage from a base image.
FROM node as base


FROM base as development
# Create new Working directory
WORKDIR /app
# in order to can run npm install
COPY package.json .
# Run to run any command 
RUN npm install
# Copy project files to container
COPY . . 
# this expose just for documentation
EXPOSE 4000
CMD ["npm","run","start-dev"]

FROM base as production
# Create new Working directory
WORKDIR /app
# in order to can run npm install
COPY package.json .
# Run to run any command 
RUN npm install
# Copy project files to container
COPY . . 
# this expose just for documentation
EXPOSE 4000
CMD ["npm","start"]
