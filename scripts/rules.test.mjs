// scripts/rules.test.mjs
// Firestore security rules emulator tests: ensure owner-only access for tasks

import { initializeTestEnvironment, assertSucceeds, assertFails } from '@firebase/rules-unit-testing'
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'

const projectId = process.env.PROJECT_ID || 'task-app-emulator'

async function run() {
  const testEnv = await initializeTestEnvironment({ projectId })

  try {
    const aliceUid = 'alice-uid'
    const bobUid = 'bob-uid'

    const aliceCtx = testEnv.authenticatedContext(aliceUid)
    const bobCtx = testEnv.authenticatedContext(bobUid)

    const aliceDb = aliceCtx.firestore()
    const bobDb = bobCtx.firestore()

    const t1Ref = doc(aliceDb, 'tasks', 't1')

    // Create by owner (allowed)
    await assertSucceeds(setDoc(t1Ref, { owner: aliceUid, status: 'open', createdAt: 0 }))

    // Read by owner (allowed)
    await assertSucceeds(getDoc(t1Ref))

    // Read by other (denied)
    await assertFails(getDoc(doc(bobDb, 'tasks', 't1')))

    // Update by other (denied)
    await assertFails(updateDoc(doc(bobDb, 'tasks', 't1'), { status: 'closed' }))

    // Update by owner (allowed)
    await assertSucceeds(updateDoc(t1Ref, { status: 'inprogress' }))

    // Create by other but spoof owner (denied)
    const t2Ref = doc(bobDb, 'tasks', 't2')
    await assertFails(setDoc(t2Ref, { owner: aliceUid, status: 'open', createdAt: 0 }))

    // Delete by owner (allowed)
    await assertSucceeds(deleteDoc(t1Ref))

    console.log('Rules tests passed: owner-only access enforced.')
  } finally {
    await testEnv.clearFirestore()
    await testEnv.cleanup()
  }
}

run().catch((e) => {
  console.error('Rules tests failed:', e)
  process.exit(1)
})
