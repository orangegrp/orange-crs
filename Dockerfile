FROM node:21
WORKDIR /opt
COPY . .
RUN npm ci
WORKDIR /opt/local_modules/orange-common-lib
RUN npm ci
RUN npx tsc
WORKDIR /opt
CMD npm run prod