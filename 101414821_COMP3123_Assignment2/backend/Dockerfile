FROM node:18

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of your application code
COPY . .

CMD ["node", "./index.js"]
