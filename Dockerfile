# Optional: only used when the app's stack is set to "dockerfile" in
# Settings. The default buildpack stack needs no Dockerfile at all.
FROM node:22-alpine

WORKDIR /app

# Copy dependency manifests first so the install layer is cached
COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
