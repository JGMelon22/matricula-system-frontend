# Stage 1: Build stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Production stage
FROM node:22-alpine AS production

WORKDIR /app

RUN npm i -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 5173

CMD [ "serve", "-s", "dist", "-l", "5173" ]