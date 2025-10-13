# Database Schema

Tài liệu chi tiết về cấu trúc cơ sở dữ liệu Firestore của TaskApp.

## 🗄️ Overview

TaskApp sử dụng Firebase Firestore làm cơ sở dữ liệu chính với các collection sau:

- **`users`**: Thông tin người dùng và profile
- **`tasks`**: Quản lý công việc
- **`projects`**: Quản lý dự án (sắp có)
- **`notes`**: Ghi chú (sắp có)
- **`settings`**: Cài đặt người dùng

## 👤 Users Collection

### Document Structure
```javascript
// Document ID: {userId}
{
  // Basic Information
  uid: string,                    // User ID (same as document ID)
  email: string,                   // User email
  displayName: string,             // Display name
  photoURL: string | null,         // Profile photo URL
  
  // Authentication
  provider: 'email' | 'google' | 'github',  // Auth provider
  providerData: {
    providerId: string | null,     // Firebase provider ID
    uid: string | null,            // Provider-specific UID
  },
  
  // Profile Information
  profile: {
    firstName: string,             // First name
    lastName: string,              // Last name
    fullName: string,              // Full name
    company: string | null,        // Company name
    jobTitle: string | null,       // Job title
    phone: string | null,          // Phone number
    bio: string | null,            // Bio/description
    timezone: string,              // User timezone
    language: string,              // Preferred language
  },
  
  // User Preferences
  preferences: {
    theme: 'light' | 'dark',       // Theme preference
    notifications: {
      email: boolean,              // Email notifications
      push: boolean,               // Push notifications
      tasks: boolean,              // Task notifications
      reminders: boolean,          // Reminder notifications
    },
    privacy: {
      profileVisible: boolean,      // Profile visibility
      showEmail: boolean,          // Email visibility
    }
  },
  
  // Metadata
  metadata: {
    createdAt: Timestamp,         // Account creation date
    updatedAt: Timestamp,          // Last update date
    lastLogin: Timestamp,          // Last login date
    isActive: boolean,             // Account status
    accountStatus: 'active' | 'suspended' | 'deleted',  // Account status
  },
  
  // Statistics
  stats: {
    tasksCompleted: number,        // Total completed tasks
    projectsCreated: number,       // Total created projects
    loginCount: number,            // Total login count
  }
}
```

### Subcollections

#### `users/{userId}/settings`
```javascript
// Document ID: 'home'
{
  layout: {
    left: string[],               // Left column widgets
    center: string[],             // Center column widgets
    right: string[],              // Right column widgets
  },
  updatedAt: Timestamp,           // Last update date
}
```

### Indexes
```json
{
  "collectionGroup": "users",
  "queryScope": "COLLECTION",
  "fields": [
    { "fieldPath": "email", "order": "ASCENDING" },
    { "fieldPath": "metadata.createdAt", "order": "DESCENDING" }
  ]
}
```

### Security Rules
```javascript
// Users collection rules
match /users/{userId} {
  allow create: if isSignedIn() && request.resource.id == request.auth.uid;
  allow read, update: if isSignedIn() && userId == request.auth.uid;
  allow delete: if false; // Soft delete only
  
  // Settings subcollection
  match /settings/{settingId} {
    allow read, write: if isSignedIn() && userId == request.auth.uid;
  }
}
```

## 📋 Tasks Collection

### Document Structure
```javascript
// Document ID: {taskId}
{
  // Ownership
  owner: string,                  // User ID (primary field)
  ownerId: string,                 // User ID (legacy field for backward compatibility)
  
  // Basic Information
  title: string,                   // Task title
  description: string,             // Task description
  
  // Status and Priority
  status: 'todo' | 'in_progress' | 'done',  // Task status
  priority: 'low' | 'medium' | 'high',      // Task priority
  
  // Dates
  dueAt: Timestamp | null,        // Due date
  completedAt: Timestamp | null,  // Completion date
  
  // Organization
  tags: string[],                 // Task tags
  projectId: string | null,       // Associated project ID
  
  // Ordering
  position: number,                // Position for drag & drop
  
  // Metadata
  createdAt: Timestamp,           // Creation date
  updatedAt: Timestamp,            // Last update date
  
  // Additional Fields
  assignee: string | null,         // Assigned user ID (future feature)
  estimatedTime: number | null,   // Estimated time in minutes
  actualTime: number | null,      // Actual time spent in minutes
}
```

### Indexes
```json
[
  {
    "collectionGroup": "tasks",
    "queryScope": "COLLECTION",
    "fields": [
      { "fieldPath": "owner", "order": "ASCENDING" },
      { "fieldPath": "createdAt", "order": "DESCENDING" }
    ]
  },
  {
    "collectionGroup": "tasks",
    "queryScope": "COLLECTION",
    "fields": [
      { "fieldPath": "owner", "order": "ASCENDING" },
      { "fieldPath": "status", "order": "ASCENDING" },
      { "fieldPath": "createdAt", "order": "DESCENDING" }
    ]
  },
  {
    "collectionGroup": "tasks",
    "queryScope": "COLLECTION",
    "fields": [
      { "fieldPath": "owner", "order": "ASCENDING" },
      { "fieldPath": "dueAt", "order": "ASCENDING" }
    ]
  }
]
```

### Security Rules
```javascript
// Tasks collection rules
match /tasks/{taskId} {
  // Allow create if either owner or legacy ownerId matches
  allow create: if isSignedIn() && (
    request.resource.data.owner == request.auth.uid ||
    request.resource.data.ownerId == request.auth.uid
  );
  
  // Back-compat read/update/delete: owner OR legacy ownerId
  allow read, update, delete: if isSignedIn() && (
    resource.data.owner == request.auth.uid ||
    resource.data.ownerId == request.auth.uid
  );
}
```

## 📁 Projects Collection (Future)

### Document Structure
```javascript
// Document ID: {projectId}
{
  // Ownership
  owner: string,                  // User ID
  
  // Basic Information
  name: string,                   // Project name
  description: string,            // Project description
  
  // Status
  status: 'active' | 'archived' | 'completed',  // Project status
  
  // Dates
  startDate: Timestamp | null,    // Project start date
  endDate: Timestamp | null,      // Project end date
  
  // Organization
  tags: string[],                 // Project tags
  color: string,                  // Project color
  
  // Metadata
  createdAt: Timestamp,          // Creation date
  updatedAt: Timestamp,           // Last update date
  
  // Statistics
  stats: {
    totalTasks: number,           // Total tasks in project
    completedTasks: number,       // Completed tasks
    progress: number,             // Progress percentage
  }
}
```

## 📝 Notes Collection (Future)

### Document Structure
```javascript
// Document ID: {noteId}
{
  // Ownership
  owner: string,                  // User ID
  
  // Basic Information
  title: string,                   // Note title
  content: string,                  // Note content (markdown)
  
  // Organization
  tags: string[],                  // Note tags
  category: string | null,         // Note category
  
  // Status
  isPinned: boolean,              // Pinned status
  isArchived: boolean,            // Archived status
  
  // Metadata
  createdAt: Timestamp,           // Creation date
  updatedAt: Timestamp,            // Last update date
  
  // Additional Fields
  wordCount: number,              // Word count
  readingTime: number,            // Estimated reading time in minutes
}
```

## 🔧 Data Migration

### 1. Backfill Operations

#### Owner Field Migration
```javascript
// Script: scripts/backfill-owner.mjs
// Migrate tasks from ownerId to owner field
const backfillOwnerField = async (userId) => {
  const tasksRef = collection(db, 'tasks')
  const q = query(tasksRef, where('ownerId', '==', userId))
  const snapshot = await getDocs(q)
  
  const batch = writeBatch(db)
  snapshot.forEach((doc) => {
    const data = doc.data()
    if (!data.owner || data.owner !== userId) {
      batch.update(doc.ref, { 
        owner: userId, 
        updatedAt: serverTimestamp() 
      })
    }
  })
  
  await batch.commit()
  console.log(`Updated ${snapshot.size} tasks for user ${userId}`)
}
```

### 2. Data Validation

#### Task Validation
```javascript
// Validate task data
const validateTask = (taskData) => {
  const errors = []
  
  // Required fields
  if (!taskData.title || taskData.title.trim() === '') {
    errors.push('Title is required')
  }
  
  if (!taskData.owner) {
    errors.push('Owner is required')
  }
  
  // Field validation
  if (taskData.title && taskData.title.length > 200) {
    errors.push('Title must be less than 200 characters')
  }
  
  if (taskData.priority && !['low', 'medium', 'high'].includes(taskData.priority)) {
    errors.push('Priority must be low, medium, or high')
  }
  
  if (taskData.status && !['todo', 'in_progress', 'done'].includes(taskData.status)) {
    errors.push('Status must be todo, in_progress, or done')
  }
  
  return errors
}
```

## 📊 Query Patterns

### 1. Common Queries

#### Get User Tasks
```javascript
// Get all tasks for a user
const getUserTasks = async (userId) => {
  const tasksRef = collection(db, 'tasks')
  const q = query(
    tasksRef,
    where('owner', '==', userId),
    orderBy('createdAt', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}
```

#### Get Tasks by Status
```javascript
// Get tasks by status
const getTasksByStatus = async (userId, status) => {
  const tasksRef = collection(db, 'tasks')
  const q = query(
    tasksRef,
    where('owner', '==', userId),
    where('status', '==', status),
    orderBy('createdAt', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}
```

#### Get Tasks by Date Range
```javascript
// Get tasks by date range
const getTasksByDateRange = async (userId, startDate, endDate) => {
  const tasksRef = collection(db, 'tasks')
  const q = query(
    tasksRef,
    where('owner', '==', userId),
    where('dueAt', '>=', startDate),
    where('dueAt', '<=', endDate),
    orderBy('dueAt', 'asc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}
```

### 2. Real-time Subscriptions

#### Task Updates
```javascript
// Subscribe to task updates
const subscribeToTasks = (userId, callback) => {
  const tasksRef = collection(db, 'tasks')
  const q = query(
    tasksRef,
    where('owner', '==', userId),
    orderBy('createdAt', 'desc')
  )
  
  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }))
    callback(tasks)
  })
}
```

#### User Profile Updates
```javascript
// Subscribe to user profile updates
const subscribeToUserProfile = (userId, callback) => {
  const userRef = doc(db, 'users', userId)
  
  return onSnapshot(userRef, (doc) => {
    if (doc.exists()) {
      callback({ id: doc.id, ...doc.data() })
    } else {
      callback(null)
    }
  })
}
```

## 🔒 Security Considerations

### 1. Data Validation

#### Server-side Validation
```javascript
// Firestore security rules with validation
match /tasks/{taskId} {
  allow create: if isSignedIn() && 
    request.resource.data.owner == request.auth.uid &&
    request.resource.data.title is string &&
    request.resource.data.title.size() > 0 &&
    request.resource.data.title.size() <= 200 &&
    request.resource.data.status in ['todo', 'in_progress', 'done'] &&
    request.resource.data.priority in ['low', 'medium', 'high'];
}
```

### 2. Data Privacy

#### User Data Protection
```javascript
// Ensure user data privacy
match /users/{userId} {
  // Users can only access their own data
  allow read, write: if isSignedIn() && userId == request.auth.uid;
  
  // Prevent deletion (soft delete only)
  allow delete: if false;
}
```

### 3. Rate Limiting

#### Firestore Quotas
- **Reads**: 50,000 reads/day (free tier)
- **Writes**: 20,000 writes/day (free tier)
- **Deletes**: 20,000 deletes/day (free tier)

#### Optimization Strategies
```javascript
// Batch operations to reduce writes
const batchCreateTasks = async (tasks) => {
  const batch = writeBatch(db)
  
  tasks.forEach(task => {
    const docRef = doc(collection(db, 'tasks'))
    batch.set(docRef, task)
  })
  
  await batch.commit()
}

// Use pagination to reduce reads
const getTasksPaginated = async (userId, limit = 20, startAfter = null) => {
  const tasksRef = collection(db, 'tasks')
  let q = query(
    tasksRef,
    where('owner', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(limit)
  )
  
  if (startAfter) {
    q = query(q, startAfter(startAfter))
  }
  
  const snapshot = await getDocs(q)
  return {
    tasks: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
    lastDoc: snapshot.docs[snapshot.docs.length - 1]
  }
}
```

## 📈 Performance Optimization

### 1. Indexing Strategy

#### Composite Indexes
```json
{
  "indexes": [
    {
      "collectionGroup": "tasks",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "owner", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "dueAt", "order": "ASCENDING" }
      ]
    }
  ]
}
```

### 2. Caching Strategy

#### Client-side Caching
```javascript
// Use Firestore offline persistence
import { enableIndexedDbPersistence } from 'firebase/firestore'

const enableOfflinePersistence = async () => {
  try {
    await enableIndexedDbPersistence(db)
    console.log('Offline persistence enabled')
  } catch (error) {
    if (error.code === 'failed-precondition') {
      console.log('Multiple tabs open, persistence can only be enabled in one tab at a time')
    } else if (error.code === 'unimplemented') {
      console.log('The current browser does not support all features required for persistence')
    }
  }
}
```

### 3. Data Structure Optimization

#### Denormalization
```javascript
// Store computed values to avoid complex queries
const taskWithStats = {
  id: 'task1',
  title: 'Complete project',
  status: 'done',
  completedAt: Timestamp,
  // Denormalized fields
  isOverdue: false,
  daysUntilDue: 3,
  priorityScore: 8
}
```

## 🧪 Testing Strategy

### 1. Unit Tests

#### Service Tests
```javascript
// Test task service
describe('TaskService', () => {
  beforeEach(() => {
    // Setup test environment
  })
  
  it('should create task with valid data', async () => {
    const taskData = {
      title: 'Test Task',
      description: 'Test Description',
      priority: 'high'
    }
    
    const task = await createTask('user1', taskData)
    
    expect(task.title).toBe('Test Task')
    expect(task.owner).toBe('user1')
    expect(task.status).toBe('todo')
  })
  
  it('should validate task data', () => {
    const invalidData = {
      title: '', // Empty title
      priority: 'invalid' // Invalid priority
    }
    
    const errors = validateTask(invalidData)
    expect(errors).toContain('Title is required')
    expect(errors).toContain('Priority must be low, medium, or high')
  })
})
```

### 2. Integration Tests

#### Firestore Integration
```javascript
// Test Firestore integration
describe('Firestore Integration', () => {
  it('should read and write tasks', async () => {
    // Create task
    const taskRef = await addDoc(collection(db, 'tasks'), {
      title: 'Integration Test Task',
      owner: 'test-user',
      createdAt: serverTimestamp()
    })
    
    // Read task
    const docSnap = await getDoc(taskRef)
    expect(docSnap.exists()).toBe(true)
    expect(docSnap.data().title).toBe('Integration Test Task')
    
    // Update task
    await updateDoc(taskRef, {
      status: 'done',
      updatedAt: serverTimestamp()
    })
    
    // Verify update
    const updatedSnap = await getDoc(taskRef)
    expect(updatedSnap.data().status).toBe('done')
  })
})
```

## 📚 Best Practices

### 1. Data Modeling

#### Keep Documents Small
```javascript
// ✅ Good: Small, focused documents
const task = {
  id: 'task1',
  title: 'Complete project',
  status: 'todo',
  owner: 'user1'
}

// ❌ Bad: Large, complex documents
const taskWithEverything = {
  id: 'task1',
  title: 'Complete project',
  // ... 50+ fields including nested objects
}
```

#### Use Subcollections for Related Data
```javascript
// ✅ Good: Use subcollections
/users/{userId}/tasks/{taskId}
/users/{userId}/settings/{settingId}

// ❌ Bad: Store everything in one document
const userWithEverything = {
  id: 'user1',
  name: 'John Doe',
  tasks: [...], // Array of tasks
  settings: {...}, // Nested settings
  // ... everything in one document
}
```

### 2. Query Optimization

#### Use Specific Queries
```javascript
// ✅ Good: Specific queries
const getActiveTasks = async (userId) => {
  const q = query(
    collection(db, 'tasks'),
    where('owner', '==', userId),
    where('status', '==', 'todo'),
    orderBy('createdAt', 'desc'),
    limit(20)
  )
  return getDocs(q)
}

// ❌ Bad: Broad queries
const getAllTasks = async () => {
  const q = query(collection(db, 'tasks'))
  return getDocs(q) // Gets all tasks from all users
}
```

### 3. Error Handling

#### Graceful Error Handling
```javascript
// Handle Firestore errors gracefully
const createTask = async (userId, taskData) => {
  try {
    const docRef = await addDoc(collection(db, 'tasks'), {
      ...taskData,
      owner: userId,
      createdAt: serverTimestamp()
    })
    return { id: docRef.id, ...taskData }
  } catch (error) {
    console.error('Error creating task:', error)
    
    if (error.code === 'permission-denied') {
      throw new Error('You do not have permission to create tasks')
    } else if (error.code === 'unavailable') {
      throw new Error('Service temporarily unavailable')
    } else {
      throw new Error('Failed to create task')
    }
  }
}
```

---

**Lưu ý**: Schema này được thiết kế để đảm bảo tính nhất quán, hiệu năng và bảo mật. Khi thêm tính năng mới, hãy tuân theo các patterns đã được thiết lập.
