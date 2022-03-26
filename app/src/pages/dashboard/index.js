import { Grid } from '@mui/material'
import { StatisticsCard } from 'src/components/StatisticsCard'
import { useAuth } from 'src/hooks/useAuth'
import { useAuthRedirect } from 'src/hooks/useAuthRedirect'

/*
 * Contractor Dashboard:
 * Create/Manage workers
 * Find Workers based on Safety record, work hours record
 * Current site safety violations
 * Time worked by each worker
 * Workload Management, assign
 */

const Dashboard = () => {
  useAuthRedirect()
  const { userType } = useAuth()

  if (userType === 'Contractor') {
    return <Grid>Contractor Dashboard</Grid>
  } else if (userType === 'Owner') {
    return <Grid>Owner Dashboard</Grid>
  } else {
    return <Grid>Error...</Grid>
  }
}

export default Dashboard
