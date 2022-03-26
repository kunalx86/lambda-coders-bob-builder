import { Grid } from '@mui/material'
import { useQuery } from 'react-query'
import Typography from '@mui/material/Typography/'
import { axios } from 'src/axios'

const Workers = () => {
  const { data, status } = useQuery('workers', async () => {
    const response = await axios.get('/getworker')

    return response.data
  })

  return (
    <Grid>
      Workers
      {status === 'loading' && 'Loading...'}
      {(data || []).map(worker => (
        <Grid key={worker.W_id}>
          <Typography>{worker.Name}</Typography>
        </Grid>
      ))}
    </Grid>
  )
}

export default Workers
