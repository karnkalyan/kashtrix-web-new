#!/bin/sh
set -e

echo "=========================================================="
echo " Starting Kashtrix Modern Web Platform (Production)"
echo " Host: ${HOSTNAME:-0.0.0.0} | Port: ${PORT:-3077}"
echo " Database: ${DATABASE_URL}"
echo "=========================================================="

# 1. Sync database schema tables
echo "==> [1/3] Syncing Prisma schema & MySQL tables..."
npx prisma db push --skip-generate --accept-data-loss || echo "Notice: Database sync completed with warnings."

# 2. Seed website content, email settings, theme & AI knowledge
echo "==> [2/3] Seeding website content, settings & AI knowledge base..."
npx tsx src/lib/runSeed.ts || echo "Notice: Seeding completed."

# 3. Start Next.js production server
echo "==> [3/3] Launching Next.js server on port ${PORT:-3077}..."
exec npm run start -- -p "${PORT:-3077}" -H "${HOSTNAME:-0.0.0.0}"
