import { Grid, Card, CardMedia, CardContent, Button } from '@mui/material'
import { useQuery } from 'react-query'
import Typography from '@mui/material/Typography/'
import { axios } from 'src/axios'

const Workers = () => {
  const { data, status } = useQuery('workers', async () => {
    const response = await axios.get('/getworker')

    return response.data
  })

  return (
    <Grid alignSelf='center' container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {status === 'loading' && 'Loading...'}
      {(data || []).map(worker => (
        <Grid ml={1} alignItems='center' item xs={8} sm={4} key={worker.p_id}>
          <Card sx={{ maxWidth: 345 }} align='center'>
            <CardMedia
              align='center'
              component='img'
              height='140'
              image='/static/images/cards/contemplative-reptile.jpg'
              alt='image of worker'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div' align='center'>
                {worker.name_worker}
              </Typography>
              <Typography variant='body2' color='text.secondary' align='center'>
                Safety - {worker.safty_status} <br />
                Daily Working Average - {worker.attendance} <br />
              </Typography>
              <Button disabled={!(worker.project_name === '')} mt={2} p={2}>
                {worker.project_name === '' ? 'Hire!' : worker.project_name}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default Workers
