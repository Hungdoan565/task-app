# Backfill owner field for legacy tasks (Plan)

Goal
- One-time backfill to set task.owner = task.ownerId for legacy documents that are missing the owner field.
- Run on staging first, verify, then run on production.

Approach
- Use Firebase Admin SDK with a service account in a standalone Node script.
- Iterate collection group `tasks`.
- For each document:
  - If `ownerId` exists and `owner` is missing or different → set `owner = ownerId`.
  - Batched writes (up to 500 per batch).
- Support `--dry-run` to preview changes.

Safety
- Run on staging first.
- Use `--dry-run` to verify counts.
- Snapshot/export before running on production if data is critical.

Prerequisites
- Create a service account in Firebase project (IAM → Service Accounts → Generate key).
- Set environment variables (PowerShell example):
  $env:GOOGLE_APPLICATION_CREDENTIALS = "C:\\path\\to\\service-account.json"
  # Optional if not in key file
  $env:FIREBASE_PROJECT_ID = "your-staging-project-id"

Run (staging)
- Dry-run:
  node scripts/backfill-owner.mjs --dry-run
- Execute:
  node scripts/backfill-owner.mjs --batch-size=300
- Verify acceptance (100% tasks có owner):
  node scripts/verify-owner.mjs

Script
- See scripts/backfill-owner.mjs for implementation.
- See scripts/verify-owner.mjs for acceptance verification.
