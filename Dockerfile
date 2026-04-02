# ============================================================
# Stage 1: Build
# ============================================================
FROM node:24-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Install dependencies (cached layer)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY . .

# Build args: VITE_* variables are baked into the bundle at build time
ARG VITE_API_URL
ARG VITE_ACCESS_TOKEN=thisIsJustRandomString
ARG VITE_USER_DATA=userData
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_ACCESS_TOKEN=${VITE_ACCESS_TOKEN}
ENV VITE_USER_DATA=${VITE_USER_DATA}

RUN pnpm build

# ============================================================
# Stage 2: Production (Nginx)
# ============================================================
FROM nginx:alpine AS production

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
    CMD wget -qO- http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
