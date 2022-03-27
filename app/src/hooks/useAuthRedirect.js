import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from './useAuth'

export const useAuthRedirect = () => {
  const { isLoggedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) router.push('login')
  }, [router, isLoggedIn])
}
