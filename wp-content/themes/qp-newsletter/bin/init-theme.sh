#!/usr/bin/env bash
#
# Instantiate the boilerplate for a new project (foundation ticket F0).
# Replaces the {{THEME_NAME}} / {{THEME_SLUG}} / {{COMPANY_NAME}} placeholders across the theme.
#
#   Usage: ./bin/init-theme.sh "<Theme Name>" <theme-slug> "<Company Name>"
#   e.g.   ./bin/init-theme.sh "Acme Store" acme-store "Acme Pty Ltd"
#
# Run from the theme root, before `npm ci`. Slug must be lowercase kebab-case (it becomes the
# text domain, package.json name, and the compiled theme-path segment in the JS utils).
#
set -euo pipefail

THEME_NAME="${1:-}"
THEME_SLUG="${2:-}"
COMPANY_NAME="${3:-}"

if [ -z "$THEME_NAME" ] || [ -z "$THEME_SLUG" ] || [ -z "$COMPANY_NAME" ]; then
  echo "Usage: $0 \"<Theme Name>\" <theme-slug> \"<Company Name>\"" >&2
  exit 1
fi

if ! printf '%s' "$THEME_SLUG" | grep -qE '^[a-z][a-z0-9-]*$'; then
  echo "Error: slug must be lowercase kebab-case (e.g. acme-store)." >&2
  exit 1
fi

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Escape sed-replacement metacharacters (& / \) so names with them are inserted literally.
esc() { printf '%s' "$1" | sed 's/[&/\]/\\&/g'; }
N="$(esc "$THEME_NAME")"
S="$(esc "$THEME_SLUG")"
C="$(esc "$COMPANY_NAME")"

# Theme paths have no newlines, so a newline-delimited loop is safe and portable
# (avoids grep -Z / read -d '' quirks and GNU-vs-BSD `sed -i`).
matches="$(grep -rl -e '{{THEME_NAME}}' -e '{{THEME_SLUG}}' -e '{{COMPANY_NAME}}' "$ROOT" \
  --include='*.php' --include='*.js' --include='*.json' --include='*.css' 2>/dev/null || true)"

count=0
printf '%s\n' "$matches" | while IFS= read -r f; do
  [ -n "$f" ] || continue
  case "$f" in
    */node_modules/*|*/gutenberg/build/*|*/.git/*) continue ;;
  esac
  sed -e "s/{{THEME_NAME}}/${N}/g" \
      -e "s/{{THEME_SLUG}}/${S}/g" \
      -e "s/{{COMPANY_NAME}}/${C}/g" \
      "$f" > "$f.mmdtmp" && mv "$f.mmdtmp" "$f"
  echo "  updated ${f#$ROOT/}"
done

echo
echo "Done. Placeholders replaced. Next:"
echo "  1. npm ci && npm run build"
echo "  2. rename the theme folder to '${THEME_SLUG}', then: ddev wp theme activate ${THEME_SLUG}"
echo "  3. F1: regenerate design tokens (website-config.json) from this project's Figma."
