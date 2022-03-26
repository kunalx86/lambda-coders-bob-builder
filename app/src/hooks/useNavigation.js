import { useEffect, useState } from 'react'
import { useAuth } from './useAuth'
import Login from 'mdi-material-ui/Login'
import { AccountPlusOutline, ViewDashboard } from 'mdi-material-ui'

export const useNavigation = () => {
  const { isLoggedIn, user } = useAuth()
  const [navItems, setNavItems] = useState([])

  useEffect(() => {
    if (isLoggedIn) {
      setNavItems(prev => [
        {
          title: 'Dashboard',
          icon: ViewDashboard,
          path: '/dashboard'
        },
        {
          title: 'Workload',
          icon: ViewDashboard,
          path: '/workload-management'
        },
        {
          title: 'Workers',
          icon: ViewDashboard,
          path: '/workers'
        },
        {
          title: 'Add Worker',
          icon: ViewDashboard,
          path: '/add-worker'
        },
        {
          title: 'Edit Workers',
          icon: ViewDashboard,
          path: '/edit-workers'
        },
        {
          title: 'Projects',
          icon: ViewDashboard,
          path: '/projects'
        },
        {
          title: 'Attendance',
          icon: ViewDashboard,
          path: '/attendance'
        },
        {
          title: 'Maps',
          icon: ViewDashboard,
          path: '/map'
        },
        {
          title: 'Payments',
          icon: ViewDashboard,
          path: '/payment'
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
        }
      ])
    }
  }, [isLoggedIn, user])

  return {
    navItems
  }
}
