# API Documentation

Tài liệu chi tiết về các API và service layer của TaskApp.

## 🔧 Service Layer Overview

TaskApp sử dụng service layer pattern để tách biệt business logic khỏi UI components. Các service chính:

- **`taskService`**: Quản lý tasks
- **`userService`**: Quản lý users
- **`layoutService`**: Quản lý layout settings
- **`authService`**: Xác thực và authorization

## 📋 Task Service

### 1. Task Operations

#### Create Task
```javascript
/**
 * Creates a new task for the specified user
 * @param {string} ownerId - The ID of the task owner
 * @param {Object} data - Task data
 * @param {string} data.title - Task title (required)
 * @param {string} data.description - Task description
 * @param {string} data.priority - Task priority ('low' | 'medium' | 'high')
 * @param {Date} data.dueAt - Task due date
 * @param {string[]} data.tags - Task tags
 * @returns {Promise<Object>} Created task object with ID
 * @throws {Error} When task creation fails
 */
export const createTask = async (ownerId, data) => {
  try {
    // Validate input data
    const errors = validateTaskData(data)
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`)
    }

    // Prepare task data
    const taskData = {
      owner: ownerId,
      ownerId: ownerId, // Legacy field for backward compatibility
      title: data.title.trim(),
      description: data.description?.trim() || '',
      priority: data.priority || 'medium',
      status: 'todo',
      tags: data.tags || [],
      dueAt: data.dueAt || null,
      position: Date.now(), // Use timestamp for ordering
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }

    // Create task in Firestore
    const docRef = await addDoc(collection(db, 'tasks'), taskData)
    
    // Log successful creation
    logger.info('Task created successfully', { 
      taskId: docRef.id, 
      ownerId, 
      title: data.title 
    })

    return {
      id: docRef.id,
      ...taskData
    }
  } catch (error) {
    logger.error('Failed to create task', { error, ownerId, data })
    throw error
  }
}
```

#### Update Task
```javascript
/**
 * Updates an existing task
 * @param {string} taskId - Task ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated task object
 * @throws {Error} When task update fails
 */
export const updateTask = async (taskId, updates) => {
  try {
    // Validate updates
    const errors = validateTaskUpdates(updates)
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`)
    }

    // Prepare update data
    const updateData = {
      ...updates,
      updatedAt: serverTimestamp()
    }

    // Update task in Firestore
    const taskRef = doc(db, 'tasks', taskId)
    await updateDoc(taskRef, updateData)

    // Get updated task
    const updatedDoc = await getDoc(taskRef)
    if (!updatedDoc.exists()) {
      throw new Error('Task not found')
    }

    logger.info('Task updated successfully', { taskId, updates })

    return {
      id: updatedDoc.id,
      ...updatedDoc.data()
    }
  } catch (error) {
    logger.error('Failed to update task', { error, taskId, updates })
    throw error
  }
}
```

#### Delete Task
```javascript
/**
 * Deletes a task
 * @param {string} taskId - Task ID
 * @returns {Promise<void>}
 * @throws {Error} When task deletion fails
 */
export const deleteTask = async (taskId) => {
  try {
    const taskRef = doc(db, 'tasks', taskId)
    
    // Check if task exists
    const taskDoc = await getDoc(taskRef)
    if (!taskDoc.exists()) {
      throw new Error('Task not found')
    }

    // Delete task
    await deleteDoc(taskRef)

    logger.info('Task deleted successfully', { taskId })
  } catch (error) {
    logger.error('Failed to delete task', { error, taskId })
    throw error
  }
}
```

#### Get Task
```javascript
/**
 * Gets a single task by ID
 * @param {string} taskId - Task ID
 * @returns {Promise<Object|null>} Task object or null if not found
 * @throws {Error} When task retrieval fails
 */
export const getTask = async (taskId) => {
  try {
    const taskRef = doc(db, 'tasks', taskId)
    const taskDoc = await getDoc(taskRef)

    if (!taskDoc.exists()) {
      return null
    }

    return {
      id: taskDoc.id,
      ...taskDoc.data()
    }
  } catch (error) {
    logger.error('Failed to get task', { error, taskId })
    throw error
  }
}
```

### 2. Task Queries

#### Get User Tasks
```javascript
/**
 * Gets all tasks for a user
 * @param {string} userId - User ID
 * @param {Object} options - Query options
 * @param {string} options.status - Filter by status
 * @param {string} options.priority - Filter by priority
 * @param {number} options.limit - Limit number of results
 * @param {DocumentSnapshot} options.startAfter - Start after this document
 * @returns {Promise<Object>} Tasks and pagination info
 */
export const getUserTasks = async (userId, options = {}) => {
  try {
    const tasksRef = collection(db, 'tasks')
    let q = query(
      tasksRef,
      where('owner', '==', userId),
      orderBy('createdAt', 'desc')
    )

    // Apply filters
    if (options.status) {
      q = query(q, where('status', '==', options.status))
    }

    if (options.priority) {
      q = query(q, where('priority', '==', options.priority))
    }

    // Apply pagination
    if (options.limit) {
      q = query(q, limit(options.limit))
    }

    if (options.startAfter) {
      q = query(q, startAfter(options.startAfter))
    }

    const snapshot = await getDocs(q)
    const tasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return {
      tasks,
      lastDoc: snapshot.docs[snapshot.docs.length - 1],
      hasMore: snapshot.docs.length === options.limit
    }
  } catch (error) {
    logger.error('Failed to get user tasks', { error, userId, options })
    throw error
  }
}
```

#### Get Tasks by Date Range
```javascript
/**
 * Gets tasks within a date range
 * @param {string} userId - User ID
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {Promise<Object[]>} Array of tasks
 */
export const getTasksByDateRange = async (userId, startDate, endDate) => {
  try {
    const tasksRef = collection(db, 'tasks')
    const q = query(
      tasksRef,
      where('owner', '==', userId),
      where('dueAt', '>=', startDate),
      where('dueAt', '<=', endDate),
      orderBy('dueAt', 'asc')
    )

    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    logger.error('Failed to get tasks by date range', { error, userId, startDate, endDate })
    throw error
  }
}
```

### 3. Real-time Subscriptions

#### Subscribe to User Tasks
```javascript
/**
 * Subscribes to real-time updates for user tasks
 * @param {string} userId - User ID
 * @param {Function} callback - Callback function
 * @param {Object} options - Subscription options
 * @returns {Function} Unsubscribe function
 */
export const subscribeToUserTasks = (userId, callback, options = {}) => {
  try {
    const tasksRef = collection(db, 'tasks')
    let q = query(
      tasksRef,
      where('owner', '==', userId),
      orderBy('createdAt', 'desc')
    )

    // Apply filters
    if (options.status) {
      q = query(q, where('status', '==', options.status))
    }

    if (options.priority) {
      q = query(q, where('priority', '==', options.priority))
    }

    return onSnapshot(q, (snapshot) => {
      const tasks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      callback(tasks)
    })
  } catch (error) {
    logger.error('Failed to subscribe to user tasks', { error, userId })
    throw error
  }
}
```

### 4. Batch Operations

#### Batch Create Tasks
```javascript
/**
 * Creates multiple tasks in a single batch operation
 * @param {string} userId - User ID
 * @param {Object[]} tasksData - Array of task data
 * @returns {Promise<Object[]>} Array of created tasks
 */
export const batchCreateTasks = async (userId, tasksData) => {
  try {
    const batch = writeBatch(db)
    const createdTasks = []

    tasksData.forEach((taskData, index) => {
      const docRef = doc(collection(db, 'tasks'))
      const task = {
        owner: userId,
        ownerId: userId,
        title: taskData.title,
        description: taskData.description || '',
        priority: taskData.priority || 'medium',
        status: 'todo',
        tags: taskData.tags || [],
        dueAt: taskData.dueAt || null,
        position: Date.now() + index, // Ensure unique ordering
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }

      batch.set(docRef, task)
      createdTasks.push({ id: docRef.id, ...task })
    })

    await batch.commit()

    logger.info('Batch tasks created successfully', { 
      userId, 
      count: createdTasks.length 
    })

    return createdTasks
  } catch (error) {
    logger.error('Failed to batch create tasks', { error, userId, tasksData })
    throw error
  }
}
```

## 👤 User Service

### 1. User Operations

#### Create User Profile
```javascript
/**
 * Creates a new user profile
 * @param {string} userId - User ID
 * @param {Object} userData - User data
 * @returns {Promise<Object>} Created user object
 */
export const createUserProfile = async (userId, userData) => {
  try {
    const userProfile = {
      uid: userId,
      email: userData.email,
      displayName: userData.displayName || '',
      photoURL: userData.photoURL || null,
      provider: userData.provider || 'email',
      profile: {
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        fullName: userData.displayName || '',
        company: userData.company || null,
        jobTitle: userData.jobTitle || null,
        phone: userData.phone || null,
        bio: userData.bio || null,
        timezone: userData.timezone || 'UTC',
        language: userData.language || 'en'
      },
      preferences: {
        theme: 'light',
        notifications: {
          email: true,
          push: true,
          tasks: true,
          reminders: true
        },
        privacy: {
          profileVisible: true,
          showEmail: false
        }
      },
      metadata: {
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        isActive: true,
        accountStatus: 'active'
      },
      stats: {
        tasksCompleted: 0,
        projectsCreated: 0,
        loginCount: 1
      }
    }

    const userRef = doc(db, 'users', userId)
    await setDoc(userRef, userProfile)

    logger.info('User profile created successfully', { userId })

    return userProfile
  } catch (error) {
    logger.error('Failed to create user profile', { error, userId, userData })
    throw error
  }
}
```

#### Update User Profile
```javascript
/**
 * Updates user profile
 * @param {string} userId - User ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated user object
 */
export const updateUserProfile = async (userId, updates) => {
  try {
    const updateData = {
      ...updates,
      'metadata.updatedAt': serverTimestamp()
    }

    const userRef = doc(db, 'users', userId)
    await updateDoc(userRef, updateData)

    // Get updated user
    const updatedDoc = await getDoc(userRef)
    if (!updatedDoc.exists()) {
      throw new Error('User not found')
    }

    logger.info('User profile updated successfully', { userId, updates })

    return {
      id: updatedDoc.id,
      ...updatedDoc.data()
    }
  } catch (error) {
    logger.error('Failed to update user profile', { error, userId, updates })
    throw error
  }
}
```

#### Get User Profile
```javascript
/**
 * Gets user profile by ID
 * @param {string} userId - User ID
 * @returns {Promise<Object|null>} User object or null if not found
 */
export const getUserProfile = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      return null
    }

    return {
      id: userDoc.id,
      ...userDoc.data()
    }
  } catch (error) {
    logger.error('Failed to get user profile', { error, userId })
    throw error
  }
}
```

## 🎨 Layout Service

### 1. Layout Operations

#### Save Layout Settings
```javascript
/**
 * Saves layout settings for a user
 * @param {string} userId - User ID
 * @param {Object} layout - Layout configuration
 * @returns {Promise<void>}
 */
export const saveLayoutSettings = async (userId, layout) => {
  try {
    const layoutData = {
      layout: {
        left: layout.left || [],
        center: layout.center || [],
        right: layout.right || []
      },
      updatedAt: serverTimestamp()
    }

    const settingsRef = doc(db, 'users', userId, 'settings', 'home')
    await setDoc(settingsRef, layoutData)

    logger.info('Layout settings saved successfully', { userId, layout })
  } catch (error) {
    logger.error('Failed to save layout settings', { error, userId, layout })
    throw error
  }
}
```

#### Get Layout Settings
```javascript
/**
 * Gets layout settings for a user
 * @param {string} userId - User ID
 * @returns {Promise<Object|null>} Layout settings or null if not found
 */
export const getLayoutSettings = async (userId) => {
  try {
    const settingsRef = doc(db, 'users', userId, 'settings', 'home')
    const settingsDoc = await getDoc(settingsRef)

    if (!settingsDoc.exists()) {
      return null
    }

    return settingsDoc.data()
  } catch (error) {
    logger.error('Failed to get layout settings', { error, userId })
    throw error
  }
}
```

## 🔐 Auth Service

### 1. Authentication Operations

#### Sign In with Email
```javascript
/**
 * Signs in user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} User object
 */
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Update last login
    await updateUserProfile(user.uid, {
      'metadata.lastLogin': serverTimestamp(),
      'stats.loginCount': increment(1)
    })

    logger.info('User signed in successfully', { userId: user.uid, email })

    return user
  } catch (error) {
    logger.error('Failed to sign in with email', { error, email })
    throw error
  }
}
```

#### Sign Up with Email
```javascript
/**
 * Signs up user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {Object} userData - Additional user data
 * @returns {Promise<Object>} User object
 */
export const signUpWithEmail = async (email, password, userData = {}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Create user profile
    await createUserProfile(user.uid, {
      email,
      displayName: userData.displayName || '',
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      provider: 'email'
    })

    logger.info('User signed up successfully', { userId: user.uid, email })

    return user
  } catch (error) {
    logger.error('Failed to sign up with email', { error, email })
    throw error
  }
}
```

#### Sign Out
```javascript
/**
 * Signs out the current user
 * @returns {Promise<void>}
 */
export const signOut = async () => {
  try {
    await signOut(auth)
    logger.info('User signed out successfully')
  } catch (error) {
    logger.error('Failed to sign out', { error })
    throw error
  }
}
```

## 📊 Analytics Service

### 1. Event Tracking

#### Track User Action
```javascript
/**
 * Tracks a user action for analytics
 * @param {string} eventName - Event name
 * @param {Object} eventData - Event data
 * @returns {Promise<void>}
 */
export const trackEvent = async (eventName, eventData = {}) => {
  try {
    // Firebase Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        event_category: eventData.category || 'user_action',
        event_label: eventData.label || '',
        value: eventData.value || 0,
        ...eventData
      })
    }

    // Custom analytics
    const analyticsData = {
      event: eventName,
      data: eventData,
      timestamp: new Date().toISOString(),
      userId: auth.currentUser?.uid || 'anonymous',
      sessionId: getSessionId()
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', analyticsData)
    }

    logger.info('Event tracked', { eventName, eventData })
  } catch (error) {
    logger.error('Failed to track event', { error, eventName, eventData })
  }
}
```

#### Track Page View
```javascript
/**
 * Tracks a page view
 * @param {string} pageName - Page name
 * @param {string} pagePath - Page path
 * @returns {Promise<void>}
 */
export const trackPageView = async (pageName, pagePath) => {
  try {
    await trackEvent('page_view', {
      page_name: pageName,
      page_path: pagePath,
      category: 'navigation'
    })
  } catch (error) {
    logger.error('Failed to track page view', { error, pageName, pagePath })
  }
}
```

## 🛠️ Utility Functions

### 1. Data Validation

#### Validate Task Data
```javascript
/**
 * Validates task data
 * @param {Object} data - Task data
 * @returns {string[]} Array of validation errors
 */
export const validateTaskData = (data) => {
  const errors = []

  // Required fields
  if (!data.title || data.title.trim() === '') {
    errors.push('Title is required')
  }

  // Field validation
  if (data.title && data.title.length > 200) {
    errors.push('Title must be less than 200 characters')
  }

  if (data.description && data.description.length > 1000) {
    errors.push('Description must be less than 1000 characters')
  }

  if (data.priority && !['low', 'medium', 'high'].includes(data.priority)) {
    errors.push('Priority must be low, medium, or high')
  }

  if (data.status && !['todo', 'in_progress', 'done'].includes(data.status)) {
    errors.push('Status must be todo, in_progress, or done')
  }

  if (data.tags && !Array.isArray(data.tags)) {
    errors.push('Tags must be an array')
  }

  if (data.tags && data.tags.length > 10) {
    errors.push('Maximum 10 tags allowed')
  }

  return errors
}
```

#### Validate User Data
```javascript
/**
 * Validates user data
 * @param {Object} data - User data
 * @returns {string[]} Array of validation errors
 */
export const validateUserData = (data) => {
  const errors = []

  // Email validation
  if (data.email && !isValidEmail(data.email)) {
    errors.push('Invalid email format')
  }

  // Name validation
  if (data.firstName && data.firstName.length > 50) {
    errors.push('First name must be less than 50 characters')
  }

  if (data.lastName && data.lastName.length > 50) {
    errors.push('Last name must be less than 50 characters')
  }

  // Phone validation
  if (data.phone && !isValidPhone(data.phone)) {
    errors.push('Invalid phone format')
  }

  return errors
}
```

### 2. Helper Functions

#### Generate Task ID
```javascript
/**
 * Generates a unique task ID
 * @returns {string} Unique task ID
 */
export const generateTaskId = () => {
  return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
```

#### Format Task Data
```javascript
/**
 * Formats task data for display
 * @param {Object} task - Task object
 * @returns {Object} Formatted task object
 */
export const formatTaskData = (task) => {
  return {
    ...task,
    title: task.title?.trim() || '',
    description: task.description?.trim() || '',
    tags: task.tags || [],
    priority: task.priority || 'medium',
    status: task.status || 'todo',
    createdAt: task.createdAt?.toDate?.() || new Date(),
    updatedAt: task.updatedAt?.toDate?.() || new Date(),
    dueAt: task.dueAt?.toDate?.() || null,
    completedAt: task.completedAt?.toDate?.() || null
  }
}
```

## 🚨 Error Handling

### 1. Error Types

#### Custom Error Classes
```javascript
// Custom error classes
export class ValidationError extends Error {
  constructor(message, field) {
    super(message)
    this.name = 'ValidationError'
    this.field = field
  }
}

export class PermissionError extends Error {
  constructor(message) {
    super(message)
    this.name = 'PermissionError'
  }
}

export class NotFoundError extends Error {
  constructor(resource) {
    super(`${resource} not found`)
    this.name = 'NotFoundError'
    this.resource = resource
  }
}
```

### 2. Error Handling Middleware

#### Service Error Handler
```javascript
/**
 * Handles service errors consistently
 * @param {Error} error - Error object
 * @param {string} context - Error context
 * @returns {Error} Processed error
 */
export const handleServiceError = (error, context) => {
  // Log error
  logger.error(`Service error in ${context}`, { error })

  // Handle specific error types
  if (error.code === 'permission-denied') {
    return new PermissionError('You do not have permission to perform this action')
  }

  if (error.code === 'not-found') {
    return new NotFoundError('Resource')
  }

  if (error.code === 'unavailable') {
    return new Error('Service temporarily unavailable. Please try again later.')
  }

  // Return original error for unknown cases
  return error
}
```

## 📈 Performance Optimization

### 1. Caching Strategy

#### In-Memory Cache
```javascript
// Simple in-memory cache
const cache = new Map()

export const getCachedData = (key) => {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < 300000) { // 5 minutes
    return cached.data
  }
  return null
}

export const setCachedData = (key, data) => {
  cache.set(key, {
    data,
    timestamp: Date.now()
  })
}
```

### 2. Batch Operations

#### Batch Update Tasks
```javascript
/**
 * Updates multiple tasks in a single batch operation
 * @param {Object[]} updates - Array of {taskId, updates} objects
 * @returns {Promise<void>}
 */
export const batchUpdateTasks = async (updates) => {
  try {
    const batch = writeBatch(db)

    updates.forEach(({ taskId, updates: taskUpdates }) => {
      const taskRef = doc(db, 'tasks', taskId)
      batch.update(taskRef, {
        ...taskUpdates,
        updatedAt: serverTimestamp()
      })
    })

    await batch.commit()

    logger.info('Batch tasks updated successfully', { count: updates.length })
  } catch (error) {
    logger.error('Failed to batch update tasks', { error, updates })
    throw error
  }
}
```

## 🧪 Testing

### 1. Service Tests

#### Task Service Tests
```javascript
// Example service test
describe('TaskService', () => {
  beforeEach(() => {
    // Setup test environment
  })

  describe('createTask', () => {
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

    it('should throw error for invalid data', async () => {
      const invalidData = {
        title: '', // Empty title
        priority: 'invalid'
      }

      await expect(createTask('user1', invalidData))
        .rejects.toThrow('Validation failed')
    })
  })
})
```

---

**Lưu ý**: API này được thiết kế để đảm bảo tính nhất quán, hiệu năng và khả năng bảo trì. Khi thêm tính năng mới, hãy tuân theo các patterns đã được thiết lập.
