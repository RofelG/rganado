FROM node:22-alpine AS client-build
WORKDIR /app/client
COPY client/package.json client/package-lock.json ./
RUN npm ci --ignore-scripts
COPY client/ ./
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY server.js app.js ./
COPY data/ ./data/
COPY --from=client-build /app/client/dist ./client/dist

USER node
EXPOSE 3000
CMD ["npm", "start"]
