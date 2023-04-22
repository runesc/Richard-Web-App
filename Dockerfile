FROM node:16.15.0-alpine

WORKDIR /client

COPY package.json .
COPY yarn.lock .

RUN npm install --force

COPY . .

EXPOSE 3000

CMD ["yarn", "vite"]
