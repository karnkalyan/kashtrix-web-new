FROM node:20-alpine AS base

# Install required system packages for Prisma on Alpine
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Install dependencies based on lockfile
COPY package.json package-lock.json ./
COPY prisma ./prisma

RUN npm ci

# Generate Prisma Client
RUN npx prisma generate

# Copy project files
COPY . .

# Build Next.js application
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# Ensure entrypoint has Unix line endings and execute permissions
RUN sed -i 's/\r$//' /app/docker-entrypoint.sh && chmod +x /app/docker-entrypoint.sh

# Environment defaults
ENV PORT=3077
ENV HOSTNAME="0.0.0.0"

EXPOSE 3077 3001

ENTRYPOINT ["/app/docker-entrypoint.sh"]
