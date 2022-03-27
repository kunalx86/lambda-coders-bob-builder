import { useEffect, useState } from 'react'
import { useAuth } from './useAuth'
import Login from 'mdi-material-ui/Login'
import { AccountPlusOutline, ViewDashboard } from 'mdi-material-ui'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import PaymentIcon from '@mui/icons-material/Payment'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar'
import ConstructionIcon from '@mui/icons-material/Construction'
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded'
import DateRangeIcon from '@mui/icons-material/DateRange'
import EditIcon from '@mui/icons-material/Edit'
import SecurityIcon from '@mui/icons-material/Security'

export const useNavigation = () => {
  const { isLoggedIn, user } = useAuth()
  const [navItems, setNavItems] = useState([])

  useEffect(() => {
    if (isLoggedIn) {
      setNavItems(prev => [
        {
          title: 'Workers',
          icon: PermContactCalendarIcon,
          path: '/workers'
        },
        {
          title: 'Workload',
          icon: DateRangeIcon,
          path: '/workload-management'
        },
        {
          title: 'Add Worker',
          icon: PersonAddIcon,
          path: '/add-worker'
        },
        {
          title: 'Edit Workers',
          icon: EditIcon,
          path: '/edit-workers'
        },
        {
          title: 'Attendance',
          icon: BookmarkAddedIcon,
          path: '/attendance'
        },
        {
          title: 'Worker Protection',
          icon: SecurityIcon,
          path: '/protection'
        },
        {
          title: 'Payments',
          icon: PaymentIcon,
          path: '/payment'
        },
        {
          title: 'Projects',
          icon: ConstructionIcon,
          path: '/projects'
        },
        {
          title: 'Maps',
          icon: MyLocationIcon,
          path: '/map'
        },
        {
          title: 'Dashboard',
          icon: ViewDashboard,
          path: '/dashboard'
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
