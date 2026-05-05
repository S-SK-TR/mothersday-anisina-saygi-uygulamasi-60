import { createContext, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { create } from 'zustand'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

interface User {
  id: string
  name: string
  email: string
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false })
}))

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/login')
    }
  }, [auth.isAuthenticated, navigate])

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}