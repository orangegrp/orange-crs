FROM node:21
WORKDIR /opt
COPY . .
RUN npm ci
WORKDIR /opt/local_modules/orange-common-lib
RUN npm ci
RUN tsc
WORKDIR /opt
CMD npm run prod