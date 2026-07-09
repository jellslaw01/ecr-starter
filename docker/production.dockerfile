FROM alpine AS baseImage
WORKDIR /usr/src/app
RUN apk add --no-cache --update nodejs 
RUN apk add --update npm 
COPY package*.json ./
RUN npm ci --only=production 

FROM alpine
WORKDIR /usr/src/app
RUN apk add --no-cache --update nodejs
COPY package*.json ./
COPY --from=baseImage /usr/src/app/node_modules ./node_modules
COPY ./src ./src
COPY ./.env .
EXPOSE 3000
CMD ["node", "./src/app.js"]
