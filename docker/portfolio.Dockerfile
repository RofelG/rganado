FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY server.js app.js ./
COPY data/ ./data/
COPY views/ ./views/
COPY css/ ./css/
COPY img/ ./img/
COPY js/ ./js/
# The portfolio assets were moved to the client source tree during the React
# migration; make them available at their existing public paths.
COPY client/src/assets/css/ ./css/
COPY client/src/assets/img/ ./img/
COPY client/src/assets/js/ ./js/

USER node
EXPOSE 3000
CMD ["npm", "start"]
