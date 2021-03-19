FROM node:latest

WORKDIR /src/

COPY . .

EXPOSE 5000

RUN npm install

CMD ["npm", "start"]