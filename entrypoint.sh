#!/bin/bash
set -e

echo "🔧 Running kc.sh build..."
/opt/keycloak/bin/kc.sh build

echo "🚀 Starting Keycloak in optimized mode..."
exec /opt/keycloak/bin/kc.sh start \
  --http-enabled=true \
  --hostname-strict-https=true \
  --proxy=edge
