#!/bin/bash
# One-time push of the ECD Astro site to GitHub.
# Run from Terminal on the Mac:  bash push-to-github.sh
set -e
cd "$(dirname "$0")"
REPO=https://github.com/endchronicdisease/ecd-website.git

if ! command -v git >/dev/null; then
  echo "git is not installed. Run: xcode-select --install   (then re-run this script)"; exit 1
fi

if [ ! -d .git ]; then
  git init -b main
  git remote add origin "$REPO"
fi
git config user.name  >/dev/null || git config user.name  "Tara"
git config user.email >/dev/null || git config user.email "tara@endchronicdisease.org"

git fetch origin main
# Keep the existing README commit as the parent so no force-push is needed
git reset --soft origin/main 2>/dev/null || true
git add -A
git commit -m "Add Astro site build (Home, About, Our Work, Team, News, Get Involved, Donate)"
git push -u origin main
echo
echo "Pushed. Netlify will now build from main: https://app.netlify.com/  ->  ecd-website"
echo "Preview: https://ecd-website.netlify.app"
