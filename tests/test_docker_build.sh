#!/bin/bash

# Test script for Docker Compose up

echo "🚀 Building Docker containers..."
docker compose build
if [ $? -ne 0 ]; then
  echo "❌ Docker build failed!"
  exit 1
fi

echo "🚀 Starting Docker containers..."
docker compose up -d
if [ $? -ne 0 ]; then
  echo "❌ Docker compose up failed!"
  docker compose ps
  exit 1
fi

echo "⏳ Waiting for services to be healthy..."
# Wait up to 60 seconds for the portfolio container to be healthy
MAX_RETRIES=12
COUNT=0
while [ $COUNT -lt $MAX_RETRIES ]; do
  # Check the health status of the portfolio container
  STATUS=$(docker compose ps --format "{{.Health}}" portfolio)
  
  if [ "$STATUS" = "healthy" ]; then
    echo "✅ Container is healthy!"
    docker compose down
    exit 0
  elif [ "$STATUS" = "unhealthy" ]; then
    echo "❌ Container is unhealthy!"
    docker compose logs portfolio
    docker compose down
    exit 1
  fi

  echo "Waiting... ($COUNT/$MAX_RETRIES)"
  sleep 5
  COUNT=$((COUNT + 1))
done

echo "❌ Timed out waiting for container to become healthy."
docker compose logs portfolio
docker compose down
exit 1
