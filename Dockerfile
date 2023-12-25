FROM node:21
WORKDIR /opt
COPY . .
RUN npm ci
CMD npm run prod