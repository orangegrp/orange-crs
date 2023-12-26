FROM node:21
WORKDIR /opt
COPY . .
WORKDIR /opt/local_modules/orange-common-lib
RUN npm ci
RUN npm run build
WORKDIR /opt
RUN npm ci
RUN npm run build
CMD npm run prod