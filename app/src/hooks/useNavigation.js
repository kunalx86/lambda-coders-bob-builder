import { useEffect, useState } from 'react'
import { useAuth } from './useAuth'
import Login from 'mdi-material-ui/Login'
import { AccountPlusOutline, ViewDashboard } from 'mdi-material-ui'

export const useNavigation = () => {
  const { isLoggedIn, user } = useAuth()
  const [navItems, setNavItems] = useState([])

  useEffect(() => {
    if (isLoggedIn) {
      setNavItems(prev =>
        prev.filter(item => item.title.toLowerCase().contains('login') || item.title.lower().contains('register'))
      )
      setNavItems(prev => [
        {
          title: 'Dashboard',
          icon: ViewDashboard,
          path: '/dashboard/'
        },
        {
          title: 'Workload Management',
          icon: ViewDashboard,
          path: '/workload-management'
        }
      ])
    } else {
      setNavItems(prev => [
        {
          title: 'Login',
          icon: Login,
          path: '/login'
        },
        {
          title: 'Register',
          icon: AccountPlusOutline,
          path: '/register'
        },
        {
          title: 'Dashboard',
          icon: ViewDashboard,
          path: '/dashboard/'
        }
      ])
    }
  }, [isLoggedIn, user])

  return {
    navItems
  }
}
