import { Grid, Card, CardMedia, CardContent, Button } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import Typography from '@mui/material/Typography/'
import { axios } from 'src/axios'

import { FormControl, Grid, TextField, Button, Card, CardMedia, CardContent } from '@mui/material'
import { useFormik } from 'formik'
import { useDebounce } from 'rooks'
import { useAuthRedirect } from 'src/hooks/useAuthRedirect'

const Workers = () => {
  const { data, status } = useQuery('projects', async () => {
    const response = await axios.get('/getproject');
 

    return response.data;
  })

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(
    async values => {
      const response = await axios.put('/updateproject', values)

      return response.data
    },
    {
      onSettled: _ => {
        queryClient.invalidateQueries(['workers'])
      }
    }
  )

  return (
    <Grid alignSelf='center' container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {status === 'loading' && 'Loading...'}
      {(data || []).map(worker => (
        <Grid ml={5} alignItems='center' item xs={4} sm={2} key={worker.p_id}>
          <Card sx={{ maxWidth: 345 }} align='center'>
            <CardMedia
              align='center'
              component='img'
              height='180'
              image={`/images/image/${worker.photo}`}
              alt='image of worker'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div' align='center'>
                {worker.Name}
              </Typography>
              <Typography gutterBottom variant='h5' component='div' align='center'>
                {worker.name_worker}
              </Typography>
              <Typography variant='body2' color='text.secondary' align='center'>
                Safety - {worker.safty_status} <br />
                Attendance - {worker.attendance} <br />
              </Typography>
              <Button
                onClick={async e => {
                  await mutateAsync(worker)
                }}
                disabled={!(worker.project_name === '' || worker.project_name === null)}
                mt={2}
                p={2}
              >
                {worker.project_name === '' || worker.project_name === null ? 'Hire!' : worker.project_name}
              </Button>
            </CardContent>
          </Card>
        </Grid>
        ))
      }
    </Grid>
    
  )
}

export default Workers
