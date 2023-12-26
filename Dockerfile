FROM node:21
WORKDIR /opt
COPY . .
RUN npm ci
WORKDIR /opt/local_modules/orange-common-lib
RUN npm ci
RUN npm run build
WORKDIR /opt
RUN npm run build
CMD npm run prod