FROM ghcr.io/puppeteer/puppeteer:20.7.3

ENV PUPPETEER_SKIP_CHHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .
CMD ["node", "src/index.cjs"]