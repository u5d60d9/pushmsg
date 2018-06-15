FROM zzrot/alpine-node

RUN apk add --update \
    supervisor \
  && rm -rf /var/cache/apk/*

ADD supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN /bin/mkdir -p /srv/logs

WORKDIR /srv

RUN npm install --silent socket.io express log4js
RUN npm dedupe
COPY index.js /srv/app.js
EXPOSE 3000

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
