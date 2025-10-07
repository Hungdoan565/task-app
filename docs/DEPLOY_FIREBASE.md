# Deploy Firestore Rules & Indexes

This guide helps you deploy Firestore security rules and composite indexes to Firebase for both staging and production.

Prerequisites
- Node.js and npm installed
- Firebase CLI installed: npm i -g firebase-tools
- Permissions to the Firebase projects (staging/production)

Project Files
- firestore.rules — Firestore security rules
- firestore.indexes.json — Firestore composite indexes
- firebase.json — Maps rules/indexes files
- .firebaserc — Aliases for staging/production (replace placeholders)

1) Configure Firebase project aliases (one-time)
- Replace placeholders in .firebaserc or set aliases via CLI:
  firebase login
  firebase use --add
  # Choose staging project and name the alias "staging"
  # Repeat and name the alias "production"

Check aliases:
  firebase projects:list
  firebase use

2) Dry-run checks (optional)
- Validate rules locally (Windows PowerShell examples):
  # Option A: run emulator only
  npm run emu:start:firestore
  # Option B (recommended): run tests inside emulator context
  npm run test:rules

- Optional: set a project id for tests
  $env:PROJECT_ID = "your-staging-project-id"

What tests do:
- Create a task with owner = current user (allowed)
- Read/update by owner (allowed)
- Read/update by other user (denied)
- Create by non-owner with spoofed owner (denied)

3) Deploy rules/indexes
- Using npm scripts:
  npm run deploy:rules          # current default alias
  npm run deploy:indexes        # current default alias
  npm run deploy:firestore      # rules + indexes to current alias

- To specific environments:
  npm run deploy:staging        # uses -P staging alias
  npm run deploy:production     # uses -P production alias

Alternatively (raw CLI):
  firebase -P staging deploy --only firestore:rules,firestore:indexes
  firebase -P production deploy --only firestore:rules,firestore:indexes

4) Verify after deploy
- Console: Firebase Console → Firestore → Rules/Indexes
- CLI: firebase firestore:indexes --project <project-id>

Notes
- Index builds can take a few minutes. Queries will error until indexes finish building.
- Keep rules strict in production. Adjust only if needed and re-deploy.
- For CI, see .github/workflows/firebase-rules-indexes.yml and add a repository secret named FIREBASE_TOKEN.
