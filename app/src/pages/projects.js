import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { axios } from 'src/axios'

const Projects = () => {
  const [detailName, setDetailName] = useState(null)

  const { data, status } = useQuery('projects', async () => {
    const response = await axios.get('/gettotalworkers')

    return response.data
  })

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {status === 'loading'
        ? 'Loading'
        : data.map(
            project =>
              project.project_name && (
                <Grid
                  onClick={e => {
                    setDetailName(project.project_name)
                  }}
                  item
                  p={1}
                  mb={5}
                  xs={4}
                  key={project.p_id}
                >
                  <Card sx={{ maxWidth: 345 }} align='center'>
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='div' align='center'>
                        {project.project_name}
                      </Typography>
                      <Typography gutterBottom variant='h5' component='div' align='center'>
                        {project.count}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )
          )}
      {detailName && (
        <Grid>
          <WorkersList detailName={detailName} />
        </Grid>
      )}
    </Grid>
  )
}

const WorkersList = ({ detailName }) => {
  const { data, isLoading } = useQuery(['workers', detailName], async () => {
    const response = await axios.post('/getworkerproject', {
      project_name: detailName
    })

    return response.data
  })

  return (
    <Grid alignSelf='center' container rowSpacing={10} columnSpacing={{ xs: 1, sm: 1, md: 3 }}>
      {isLoading && 'Loading...'}
      {!isLoading &&
        (data || []).map(worker => (
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

export default Projects
