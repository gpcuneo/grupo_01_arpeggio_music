FROM node:20-alpine AS base
WORKDIR /app
COPY --chown=node:node ./package.json ./package.json
COPY --chown=node:node ./package-lock.json ./package-lock.json
RUN npm install --loglevel warn --production

FROM base AS dev
COPY --chown=node:node ./app/ ./
USER node
RUN npm install --loglevel warn
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM base AS production
WORKDIR /app
USER node
COPY --chown=node:node --from=dev /app/dist ./dist/
COPY --chown=node:node --from=base /app/node_modules ./node_modules
COPY --chown=node:node ./package.json ./package.json
COPY --chown=node:node ./package-lock.json ./package-lock.json
EXPOSE 3000
CMD ["npm", "start"]