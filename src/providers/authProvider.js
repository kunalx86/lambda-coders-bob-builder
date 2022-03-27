import { createContext, useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { axios } from '../axios'

export const AuthContext = createContext({
  user: null,
  userType: null,
  isLoading: true,
  isLoggedIn: false,
  login: _ => {},
  register: _ => {},
  logout: () => {}
})

export const AuthProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true)

  const [{ user, userType, isLoggedIn, error }, setState] = useState({
    user: null,
    userType: 'Contractor',

    userType: null,
    isLoggedIn: false,
    error: null
  })
  const router = useRouter()

  const checkStatus = useCallback(async () => {
    // TODO: API route fix
    const response = await axios.get('/whoami', {
      withCredentials: true
    })
    setState(prev => ({
      ...prev,
      isLoggedIn: !!response.data.data,
      user: response.data.data,
      error: null
    }))
  }, [])

  useEffect(() => {
    setLoading(true)
    checkStatus().catch(err => {
      setState(prev => ({
        ...prev,
        error: err?.response?.data?.error || 'Something went wrong'
      }))
    })
    setLoading(false)
  }, [checkStatus])

  const login = useCallback(
    creds => {
      setLoading(true)
      axios
        .post('/auth/login', creds, {
          withCredentials: true
        })
        .then(_ => {
          checkStatus()
          router.reload()
        })
        .catch(err => {
          setState(prev => ({
            ...prev,
            error: err?.response?.data?.error || 'Something went wrong'
          }))
        })
      setLoading(false)
    },
    [checkStatus, router]
  )

  const logout = useCallback(() => {
    setLoading(true)
    axios
      .post(
        '/auth/logout',
        {},
        {
          withCredentials: true
        }
      )
      .then(_ => {
        checkStatus()
        router.reload()
      })
      .catch(err => {
        setState(prev => ({
          ...prev,
          error: err?.response?.data?.error || 'Something went wrong'
        }))
      })
    setLoading(false)
  }, [checkStatus, router])

  const register = useCallback(async creds => {
    setLoading(true)
    axios
      .post('/auth/register', {
        ...creds
      })
      .then(_ => {
        // TODO: Umm do something here
      })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        userType,
        error,
        isLoading,
        isLoggedIn,
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
