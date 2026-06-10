#!/usr/bin/env bash
# Push every secret in .env.local to Vercel (Production + Preview) in one go,
# so the deploy "just works" without pasting vars into the dashboard.
#
# Prereqs (one time):
#   npm i -g vercel
#   vercel login
#   vercel link        # run in this repo, pick the LabGenie project
#
# Then:
#   bash scripts/push-vercel-env.sh
#   vercel --prod
#
# Re-run it any time you add values to .env.local (e.g. the Keystatic GitHub App
# vars after the /keystatic setup wizard). It overwrites existing values.

set -euo pipefail
cd "$(dirname "$0")/.."

[ -f .env.local ] || { echo "No .env.local found. Copy .env.example and fill it first."; exit 1; }
command -v vercel >/dev/null 2>&1 || { echo "Vercel CLI missing. Run: npm i -g vercel"; exit 1; }

pushed=0
while IFS= read -r line || [ -n "$line" ]; do
  # skip blanks and comments
  case "${line# }" in ''|\#*) continue;; esac
  name="${line%%=*}"
  value="${line#*=}"
  # trim surrounding whitespace from the name
  name="$(printf '%s' "$name" | tr -d '[:space:]')"
  [ -n "$name" ] && [ -n "$value" ] || continue

  for target in production preview; do
    vercel env rm "$name" "$target" -y >/dev/null 2>&1 || true
    printf '%s' "$value" | vercel env add "$name" "$target" >/dev/null 2>&1 \
      && echo "  set  $name  ($target)" \
      || echo "  FAILED  $name  ($target)"
  done
  pushed=$((pushed + 1))
done < .env.local

echo "Pushed $pushed variable(s) to Vercel. Next: vercel --prod"
