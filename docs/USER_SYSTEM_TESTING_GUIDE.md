# 🧪 User System Testing Guide

## 📅 Created: 2025-01-06

---

## 🎯 What We're Testing

**Complete User Authentication & Profile System:**
- ✅ Firebase Authentication (Email, Google, GitHub)
- ✅ Firestore User Profile Storage
- ✅ User Context Management
- ✅ OAuth Quick Recovery
- ✅ Profile Data Persistence

---

## 🚀 How to Test

### **1. Start the Development Server**
```bash
cd D:\FullStack\DuAn\task-app\task-app
npm run dev
```

### **2. Open Browser**
Navigate to: `http://localhost:5173`

---

## 📋 Test Scenarios

### **Scenario 1: Email Registration & Login**

#### **Test New User Registration:**
1. ✅ Go to auth page → Switch to "Create Account" 
2. ✅ Fill in:
   - Full Name: "Test User"
   - Email: "test@example.com" 
   - Password: "test123456"
   - Confirm Password: "test123456"
   - ✅ Agree to terms
3. ✅ Click "Create Account"
4. ✅ Should redirect to Dashboard
5. ✅ Check Console for: "✅ User profile created in Firestore"

#### **Test Existing User Login:**
1. ✅ Sign out from dashboard
2. ✅ Go to auth page (should be on "Sign In")
3. ✅ Enter same credentials:
   - Email: "test@example.com"
   - Password: "test123456" 
4. ✅ Click "Sign In"
5. ✅ Should redirect to Dashboard
6. ✅ Check Console for: "✅ User profile loaded"

### **Scenario 2: Google OAuth**

#### **Test Google Sign-In:**
1. ✅ Go to auth page
2. ✅ Click "Continue with Google" 
3. ✅ Complete Google OAuth flow
4. ✅ Should redirect to Dashboard  
5. ✅ Check Console for: "✅ Google user profile saved to Firestore"

#### **Test OAuth Quick Recovery:**
1. ✅ Sign out → Go to auth page
2. ✅ Click "Continue with Google"
3. ✅ **Close popup immediately** 
4. ✅ Button should become clickable within 1-3 seconds
5. ✅ Check Console for: "OAuth timeout - button reset"

### **Scenario 3: GitHub OAuth**

#### **Test GitHub Sign-In:**
1. ✅ Go to auth page  
2. ✅ Click "Continue with GitHub"
3. ✅ Complete GitHub OAuth flow
4. ✅ Should redirect to Dashboard
5. ✅ Check Console for: "✅ GitHub user profile saved to Firestore"

#### **Test OAuth Quick Recovery:**
1. ✅ Sign out → Go to auth page
2. ✅ Click "Continue with GitHub"
3. ✅ **Close popup after 2 seconds**
4. ✅ Button should reset within 3 seconds total
5. ✅ Check Console for: "OAuth timeout - button reset"

### **Scenario 4: Profile Data Verification**

#### **Check Dashboard Debug Info:**
1. ✅ Login with any method
2. ✅ Go to Dashboard
3. ✅ Scroll to "User Profile Debug Info" section
4. ✅ Verify all green checkmarks:
   - ✅ Firebase Auth User: Present
   - ✅ Firestore Profile: Present  
   - ✅ UID Match: Yes
   - ✅ Email Match: Yes

#### **Verify Firestore Data Structure:**
1. ✅ Check the "Firestore Profile" JSON
2. ✅ Should contain:
   ```json
   {
     "uid": "...",
     "email": "user@example.com", 
     "displayName": "User Name",
     "provider": "email|google|github",
     "profile": {
       "firstName": "...",
       "lastName": "...", 
       "fullName": "...",
       "timezone": "...",
       "language": "..."
     },
     "preferences": { ... },
     "metadata": {
       "createdAt": "timestamp",
       "updatedAt": "timestamp", 
       "lastLogin": "timestamp",
       "isActive": true,
       "accountStatus": "active"
     },
     "stats": {
       "tasksCompleted": 0,
       "projectsCreated": 0,
       "loginCount": 1
     }
   }
   ```

### **Scenario 5: Cross-Session Persistence**

#### **Test Session Persistence:**
1. ✅ Login with any method
2. ✅ Refresh the page
3. ✅ Should stay logged in
4. ✅ User data should persist

#### **Test Sign Out:**
1. ✅ Click "Sign Out" from Dashboard  
2. ✅ Should redirect to auth page
3. ✅ Should show "Not Authenticated" if accessing Dashboard
4. ✅ Check Console for: "🚪 User signed out"

---

## 🔍 Firebase Console Verification

### **Check Firestore Database:**
1. ✅ Go to [Firebase Console](https://console.firebase.google.com/)
2. ✅ Select your project: "task-management-255a1"
3. ✅ Navigate to **Firestore Database**
4. ✅ Should see `users` collection
5. ✅ Each user document should have:
   - Document ID = user's UID
   - All profile fields populated
   - Timestamps in metadata
   - Stats tracking

### **Check Authentication:**
1. ✅ Navigate to **Authentication** tab
2. ✅ Should see all test users
3. ✅ Provider info should be correct:
   - Email users: "password" provider
   - OAuth users: "google.com" or "github.com"

---

## 🚨 Common Issues & Solutions

### **Issue 1: "Failed to create user profile"**
**Solution:** Check Firebase rules and internet connection
```javascript
// Console should show specific error
console.error('❌ Error creating user profile:', error)
```

### **Issue 2: OAuth popup blocked**
**Solution:** Allow popups for localhost in browser settings
```
Chrome: Settings → Privacy → Popups → Allow for localhost:5173
```

### **Issue 3: User profile not loading**
**Solution:** Check UserContext and service imports
```javascript
// Check if UserProvider wraps the app
<UserProvider>
  <Router>...</Router>
</UserProvider>
```

### **Issue 4: Quick Recovery not working**
**Solution:** Verify timeout logic in auth handlers
```javascript
// Should see this in console after 3 seconds
console.log('OAuth timeout - button reset')
```

---

## 📊 Expected Test Results

### **✅ All Tests Pass If:**

#### **Console Messages:**
```
🔐 User authenticated: user@example.com
✅ User profile created in Firestore  
✅ User profile loaded: [uid]
OAuth timeout - button reset (when testing popup close)
🚪 User signed out
```

#### **Dashboard Display:**
- ✅ Shows user's display name
- ✅ Shows correct email
- ✅ Shows correct provider (email/google/github)
- ✅ Debug section shows all green checkmarks
- ✅ Firebase and Firestore data match

#### **Firebase Console:**
- ✅ Users appear in Authentication tab
- ✅ User profiles in Firestore `users` collection
- ✅ All required profile fields populated
- ✅ Metadata timestamps are recent

---

## 🛠️ Debugging Tips

### **Enable Verbose Logging:**
```javascript
// In browser console, enable Firebase debug logs
localStorage.setItem('debug', 'firestore:*')
```

### **Check Network Tab:**
- Firestore writes should show 200 status
- Auth requests should complete successfully
- No CORS errors

### **Verify State Management:**
```javascript
// In browser console, check user context
window.userContext = useUser() // If exposed for debugging
```

---

## 🎉 Success Criteria

**✅ User system is working if:**

1. **All 5 test scenarios pass**
2. **No console errors during normal flow**  
3. **User profiles saved to Firestore correctly**
4. **OAuth quick recovery works (3s max)**
5. **Cross-session persistence works**
6. **Sign out clears user state**

**🚀 Ready for production use!**

---

## 🔜 Next Steps After Testing

If all tests pass:
1. ✅ Remove debug component from Dashboard
2. ✅ Build actual task management features
3. ✅ Add user settings page
4. ✅ Implement profile editing
5. ✅ Add task data structure

**Current Status:** User authentication & profile system complete! 🎯