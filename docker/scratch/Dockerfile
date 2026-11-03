FROM node:22-alpine
WORKDIR /app
ARG SCRATCH_REF=cba5b8d2fe2a0a96144c7361ebc357a4b12953a7
RUN apk add --no-cache curl tar \
    && curl -fsSL "https://codeload.github.com/RofelG/scratch/tar.gz/${SCRATCH_REF}" | tar xz --strip-components=1 \
    && npm ci --omit=dev \
    && sed -i 's|href="/favicon/|href="/scratch/favicon/|g; s|href="/css/|href="/scratch/css/|g; s|src="/js/|src="/scratch/js/|g' views/index.ejs \
    && sed -i 's|`/API/|`/scratch/API/|g; s|`/img/|`/scratch/img/|g' public/js/index.js \
    && apk del curl tar
ENV NODE_ENV=production
COPY docker/scratch/default-content.json /app/default-content.json
EXPOSE 3000
CMD ["sh", "-c", "export CONTENT_MAPPING=\"${CONTENT_MAPPING:-$(cat /app/default-content.json)}\"; exec node server.js"]
