import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { loginWithGoogle, loginWithEmail, registerWithEmail, logout, onAuthChanged, getCurrentUser } from '@/lib/auth'
import { USE_MOCK } from '@/lib/firebase'

const AuthContext = createContext({
  user: null,
  loading: true,
  isMock: USE_MOCK,
  loginGoogle: async () => {},
  loginEmail: async (_email, _password) => {},
  registerEmail: async (_name, _email, _password) => {},
  logout: async () => {},
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthChanged((u) => {
      setUser(u)
      setLoading(false)
    })
    return () => unsub && unsub()
  }, [])

  const value = useMemo(() => ({
    user,
    loading,
    isMock: USE_MOCK,
    loginGoogle: async () => {
      const u = await loginWithGoogle()
      setUser(u)
      return u
    },
    loginEmail: async (email, password) => {
      const u = await loginWithEmail(email, password)
      setUser(u)
      return u
    },
    registerEmail: async (name, email, password) => {
      const u = await registerWithEmail(name, email, password)
      setUser(u)
      return u
    },
    logout: async () => {
      await logout()
      setUser(null)
    },
  }), [user, loading])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
