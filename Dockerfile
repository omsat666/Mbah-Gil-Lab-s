# ====================================================================
# Dockerfile for Digital Research Assistant
# ====================================================================
FROM node:22-alpine

WORKDIR /app

# Copy production package manifest
COPY package.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy server code, pre-built frontend, and SQLite database
COPY server/ ./server/
COPY dist/ ./dist/
COPY database.sqlite ./database.sqlite
COPY server.js ./server.js
COPY app.js ./app.js

# Expose server port
EXPOSE 3001

ENV NODE_ENV=production
ENV PORT=3001

# Start fullstack server
CMD ["node", "server.js"]
