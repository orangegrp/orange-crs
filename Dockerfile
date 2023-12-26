FROM node:21
WORKDIR /opt
COPY . .
RUN npm ci
WORKDIR /opt/local_modules/orange-common-lib
RUN npm ci
WORKDIR /opt
RUN npm run build-all
CMD npm run prod