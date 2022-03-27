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
    userType: null,
    isLoggedIn: false,
    error: null
  })
  const router = useRouter()

  const checkStatus = useCallback(async () => {
    const token = localStorage.getItem('token')
    if (token)
      setState({
        user: token,
        isLoggedIn: true,
        userType: 'Contractor',
        error: null
      })
  }, [])

  useEffect(() => {
    checkStatus()
  }, [checkStatus])

  // useEffect(() => {
  //   setLoading(true)
  //   checkStatus().catch(err => {
  //     setState(prev => ({
  //       ...prev,
  //       error: err?.response?.data?.error || 'Something went wrong'
  //     }))
  //   })
  //   setLoading(false)
  // }, [checkStatus])

  const login = useCallback(
    creds => {
      setLoading(true)
      axios
        .post('/login', creds, {})
        .then(res => {
          console.log(res.data.token)
          localStorage.setItem('token', res.data.token)
          setState(prev => ({
            ...prev,
            isLoggedIn: true,
            user: res.data.token,
            userType: 'Contractor'
          }))
          router.push('/dashboard/')
        })
        .catch(err => {
          setState(prev => ({
            ...prev,
            error: err?.response?.data?.error || 'Something went wrong'
          }))
        })
      setLoading(false)
    },
    [router]
  )

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    setState(prev => ({
      ...prev,
      isLoggedIn: false,
      user: null,
      userType: null
    }))
    router.push('/')
  }, [router])

  const register = useCallback(async creds => {
    setLoading(true)
    axios
      .post('/createcontractors', {
        ...creds
      })
      .then(res => {
        // TODO: Umm do something here
        console.log(res)
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
