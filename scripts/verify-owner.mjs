// scripts/verify-owner.mjs
// Verify acceptance: 100% tasks have `owner` set.
// Usage (PowerShell):
//   $env:GOOGLE_APPLICATION_CREDENTIALS = "C:\\path\\to\\service-account.json"
//   $env:FIREBASE_PROJECT_ID = "your-staging-project-id"
//   node scripts/verify-owner.mjs

import admin from 'firebase-admin'

async function initAdmin() {
  const projectId = process.env.FIREBASE_PROJECT_ID
  if (admin.apps.length) return admin.app()
  const app = admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: projectId || undefined,
  })
  return app
}

async function run() {
  await initAdmin()
  const db = admin.firestore()
  const snapshot = await db.collectionGroup('tasks').get()

  let total = 0
  let missingOwner = 0
  let mismatched = 0

  for (const doc of snapshot.docs) {
    total++
    const data = doc.data() || {}
    const hasOwner = Object.prototype.hasOwnProperty.call(data, 'owner') && data.owner
    if (!hasOwner) missingOwner++
    if (data.ownerId && data.owner && data.ownerId !== data.owner) mismatched++
  }

  console.log(JSON.stringify({ total, missingOwner, mismatched }, null, 2))
  if (missingOwner === 0 && mismatched === 0) {
    console.log('ACCEPTANCE PASSED: 100% tasks have owner and no mismatches.')
  } else {
    console.log('ACCEPTANCE FAILED: Please run backfill and verify again.')
    process.exitCode = 1
  }
}

run().catch((e) => {
  console.error('Verification failed:', e)
  process.exit(1)
})
