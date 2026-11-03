FROM alpine:3.21 AS flower
ARG FLOWER_REF=e091d01f8562fc2571a10514004268f02c7cc7b6
RUN apk add --no-cache curl tar \
    && mkdir /flower \
    && curl -fsSL "https://codeload.github.com/RofelG/flower/tar.gz/${FLOWER_REF}" | tar xz -C /flower --strip-components=1

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY css/ /usr/share/nginx/html/css/
COPY img/ /usr/share/nginx/html/img/
COPY js/ /usr/share/nginx/html/js/
COPY --from=flower /flower/ /usr/share/nginx/html/flower/
EXPOSE 80
