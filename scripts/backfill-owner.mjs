// scripts/backfill-owner.mjs
// One-time backfill: set owner = ownerId on legacy task documents
// Usage:
//   $env:GOOGLE_APPLICATION_CREDENTIALS = "C:\\path\\to\\service-account.json"
//   $env:FIREBASE_PROJECT_ID = "your-staging-project-id" # optional if present in credentials
//   node scripts/backfill-owner.mjs --dry-run
//   node scripts/backfill-owner.mjs --batch-size=300

import admin from 'firebase-admin'

function parseArgs() {
  const args = process.argv.slice(2)
  const opts = { dryRun: false, batchSize: 500, collectionGroup: 'tasks' }
  for (const a of args) {
    if (a === '--dry-run') opts.dryRun = true
    else if (a.startsWith('--batch-size=')) opts.batchSize = Math.min(500, Math.max(1, Number(a.split('=')[1] || '500')))
    else if (a.startsWith('--collection-group=')) opts.collectionGroup = a.split('=')[1] || 'tasks'
  }
  return opts
}

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
  const { dryRun, batchSize, collectionGroup } = parseArgs()
  await initAdmin()
  const db = admin.firestore()

  console.log(`Starting backfill (dryRun=${dryRun}) on collectionGroup=${collectionGroup}, batchSize=${batchSize}`)

  const cgRef = db.collectionGroup(collectionGroup)
  const snapshot = await cgRef.get()

  let toUpdate = []
  let scanned = 0
  let updated = 0

  for (const doc of snapshot.docs) {
    scanned++
    const data = doc.data() || {}
    const ownerId = data.ownerId
    const owner = data.owner

    if (ownerId && owner !== ownerId) {
      toUpdate.push({ ref: doc.ref, ownerId })
      if (toUpdate.length >= batchSize) {
        if (!dryRun) {
          const batch = db.batch()
          for (const d of toUpdate) batch.update(d.ref, { owner: d.ownerId })
          await batch.commit()
        }
        updated += toUpdate.length
        console.log(`Committed ${toUpdate.length} updates (total updated=${updated}, scanned=${scanned})`)
        toUpdate = []
      }
    }
  }

  if (toUpdate.length) {
    if (!dryRun) {
      const batch = db.batch()
      for (const d of toUpdate) batch.update(d.ref, { owner: d.ownerId })
      await batch.commit()
    }
    updated += toUpdate.length
    console.log(`Committed ${toUpdate.length} updates (total updated=${updated}, scanned=${scanned})`)
  }

  console.log(`Backfill complete. scanned=${scanned}, wouldUpdate=${updated}${dryRun ? ' (dry-run)' : ''}`)
}

run().catch((e) => {
  console.error('Backfill failed:', e)
  process.exit(1)
})
