FROM node:22-alpine AS base
WORKDIR /app

FROM base AS deps
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM base AS build-deps
COPY package.json package-lock.json ./
RUN npm ci

FROM build-deps AS test
COPY . .
RUN npm run test:run

FROM build-deps AS build
COPY . .
RUN npm run build

FROM base AS runtime
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
