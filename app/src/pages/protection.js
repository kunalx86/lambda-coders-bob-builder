import { Grid, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { axios } from 'src/axios'

const Protection = () => {
  const [file, setFile] = useState(null)
  const [resultImg, setResultImg] = useState('')

  return (
    <Grid>
      <Typography>Worker Protection System</Typography>
      <Grid item>
        <input type='file' onChange={e => setFile(e.target.files[0])} />
        <Button
          onClick={e => {
            setResultImg(file.name.split('.')[0] + '.png')
          }}
        >
          Predict
        </Button>
      </Grid>
      <Grid>{resultImg.length > 0 && <img alt={'Output'} src={`/images/output/${resultImg}`} />}</Grid>
      <Grid>{resultImg && <Culprit id={(parseInt(resultImg.split('.')[0]) + 126).toString()} />}</Grid>
    </Grid>
  )
}

const Culprit = ({ id }) => {
  const { data, isLoading } = useQuery(['workers', id], async () => {
    const response = await axios.get(`/getworkerbyid/${id}`)

    return response.data
  })

  return (
    <Grid>
      {!isLoading && (
        <Grid>
          {data[0]?.Name} working at {data[0]?.project_name} at {data[0].latitude} and {data[0].longitude}
        </Grid>
      )}{' '}
      yesterday
    </Grid>
  )
}

export default Protection
