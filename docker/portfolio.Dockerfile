FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY server.js ./
COPY data/ ./data/
COPY views/ ./views/
COPY css/ ./css/
COPY img/ ./img/
COPY js/ ./js/
USER node
EXPOSE 3000
CMD ["npm", "start"]
