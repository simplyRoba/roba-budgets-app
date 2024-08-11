FROM nginx:stable-alpine-slim

COPY dist/roba-budgets-app/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/templates/default.conf.template

# for healthcheck
RUN apk --no-cache add curl

# when docker engine version 25 is wildly used, use: --start-period=30s --start-interval=10s --interval=3m
# https://docs.docker.com/engine/reference/builder/#healthcheck
HEALTHCHECK --interval=60s --timeout=10s --retries=3 \
  CMD curl -f -s http://localhost:80/health/check || exit 1

EXPOSE 80
