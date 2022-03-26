
import { useQuery } from 'react-query'
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

  return (
    <Grid container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
      {status === 'loading' && 'Loading...'}
      {
        (data || []).map(worker => (
      <Grid item xs={4} key={worker.p_id}>
      <Card sx={{ maxWidth: 345 }} align='center' >
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
              Safety - <br />
              Daily Working Average - <br />
            </Typography>
            <Button
              disabled={!(worker.Name === "null")}
              mt={2}
              p={2}
            >
                   {worker.Name === "null" ? "Hire!" : worker.Name}
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
