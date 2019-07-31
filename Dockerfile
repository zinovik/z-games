FROM node:12.7.0

# Create work directory
WORKDIR /app

# Copy app config files
COPY package.json ./
COPY package-lock.json ./

# Install app dependencies
RUN npm install

# Copy source-code
COPY src ./src
COPY public ./public
COPY images.d.ts ./
COPY tsconfig.json ./
COPY tsconfig.prod.json ./
COPY tsconfig.test.json ./
COPY tslint.json ./

# Build and run the app
CMD npm run start:dev
