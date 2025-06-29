# Stage 1: Build the app
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source files
COPY . .

# Build the Vite app
RUN npm run build

# Stage 2: Serve the static build using `serve`
FROM node:20-alpine AS runner

WORKDIR /app

# Install lightweight static server
RUN npm install -g serve

# Copy build output from previous stage
COPY --from=builder /app/dist ./dist

EXPOSE 5173

# Serve the built files
CMD ["serve", "-s", "dist", "-l", "5173"]
