import { Grid } from '@mui/material'
import { useAuthRedirect } from 'src/hooks/useAuthRedirect'

const WorkloadManagement = () => {
  useAuthRedirect()

  return <Grid></Grid>
}

export default WorkloadManagement
