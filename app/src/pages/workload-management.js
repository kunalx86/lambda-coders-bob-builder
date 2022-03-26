import { FormControl, Grid, TextField, Typography, Button, Card, CardMedia, CardContent } from '@mui/material'
import { useFormik } from 'formik'
import { useDebounce } from 'rooks'
import { useAuthRedirect } from 'src/hooks/useAuthRedirect'

const WorkloadManagement = () => {
  useDebounce(useAuthRedirect, 1000)

  const formik = useFormik({
    initialValues: {
      safetyValue: null,
      dailyAverage: null,
      attendance: null
    },
    onSubmit: (values, actions) => {
      console.log(values)
    }
  })

  return (
    <Grid p={2}>
      <Grid p={2}>
        <FormControl onSubmit={formik.handleSubmit}>
          <Grid p={2} item xs={12}>
            <TextField
              fullWidth
              id='safetyValue'
              value={formik.values.safetyValue}
              onChange={formik.handleChange}
              label='Safety Value'
              placeholder='Enter safety value...'
              error={formik.touched.safetyValue && !!formik.errors.safetyValue}
              helperText={formik.touched.safetyValue && formik.errors.safetyValue}
            />
          </Grid>
          <Grid p={2} item xs={12}>
            <TextField
              fullWidth
              id='dailyAverage'
              value={formik.values.safetyValue}
              onChange={formik.handleChange}
              label='Daily Work Average (in hours)'
              placeholder='Enter daily average...'
              error={formik.touched.dailyAverage && !!formik.errors.dailyAverage}
              helperText={formik.touched.dailyAverage && formik.errors.dailyAverage}
            />
          </Grid>
          <Grid p={2} item xs={12}>
            <TextField
              fullWidth
              id='attendance'
              value={formik.values.attendance}
              onChange={formik.handleChange}
              label='Attendance'
              placeholder='Enter attendance...'
              error={formik.touched.dailyAverage && !!formik.errors.dailyAverage}
              helperText={formik.touched.dailyAverage && formik.errors.dailyAverage}
            />
          </Grid>
          <Button variant='outlined' p={2} width='70%' type='submit'>
            Find
          </Button>
        </FormControl>
      </Grid>
      <Grid p={2}>
        {/* card component starts here */}
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
              Name of Worker
            </Typography>
            <Typography variant='body2' color='text.secondary' align='center'>
              Safety - <br />
              Daily Working Average - <br />
              Attendance -
            </Typography>
            <Button
              mt={2}
              p={2}
              size='small'
              variant='contained'
              onClick={() => {
                alert('clicked')
              }}
            >
              Assign to Project
            </Button>
          </CardContent>
        </Card>
        {/* card component ends here */}
      </Grid>
    </Grid>
  )
}

export default WorkloadManagement
