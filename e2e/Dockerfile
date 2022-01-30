FROM cypress/included:9.3.1 as cypress_ts

WORKDIR /app
COPY package.json ./

RUN npm install -g typescript@$(node -pe "require('./package').devDependencies.typescript") && \
  mkdir -p ./node_modules/.bin && \
  cp -R /usr/local/lib/node_modules/typescript/ ./node_modules && \
  ln -s ./node_modules/typescript/bin/tsc ./node_modules/.bin/tsc && \
  ln -s ./node_modules/typescript/bin/tsserver ./node_modules/.bin/tsserver && \
  rm -rf /usr/local/lib/node_modules/typescript
