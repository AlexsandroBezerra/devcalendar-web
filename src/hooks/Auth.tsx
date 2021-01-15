import React, { createContext, useCallback, useContext, useState } from 'react'

import api from '../services/api'

interface User {
  id: string
  avatarUrl: string
  name: string
  email: string
}

interface AuthState {
  user: User
  token: string
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  user: User
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
  updateUser: (user: User) => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@DevCalendar:token')
    const user = localStorage.getItem('@DevCalendar:user')

    if (token && user) {
      api.defaults.headers.Authorization = `Bearer ${token}`

      return { token, user: JSON.parse(user) }
    }

    return {} as AuthState
  })

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('sessions', {
      email,
      password
    })

    const { user, token } = response.data

    localStorage.setItem('@DevCalendar:user', JSON.stringify(user))
    localStorage.setItem('@DevCalendar:token', token)

    api.defaults.headers.Authorization = `Bearer ${token}`

    setData({ user, token })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@DevCalendar:token')
    localStorage.removeItem('@DevCalendar:user')

    setData({} as AuthState)
  }, [])

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@GoBarber:user', JSON.stringify(user))

      setData({
        token: data.token,
        user
      })
    },
    [data]
  )

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
