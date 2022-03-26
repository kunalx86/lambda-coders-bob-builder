import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import { useFormik } from 'formik'
import { AccountOutline, Phone } from 'mdi-material-ui'
import { useMutation } from 'react-query'
import { useState } from 'react'
import { axios } from 'src/axios'
import { aadharVerify } from 'src/utils/aadharVerify'

const AddWorker = () => {
  const { mutateAsync } = useMutation(
    async values => {
      const response = await axios.post('/createworker', values)

      return response.data
    },
    {
      onSuccess: _ => {
        console.log('Woo')
      }
    }
  )

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      aadhar: '',
      photo: null
    },
    validate: ({ aadhar }) => {
      if (!aadharVerify(aadhar)) {
        return {
          aadhar: 'Not a valid aadhar number'
        }
      }
    },
    onSubmit: async (values, actions) => {
      await mutateAsync({
        ...values,
        photo: values.photo.name
      })
      actions.resetForm({
        name: '',
        phone: '',
        aadhar: '',
        photo: null
      })
    }
  })

  return (
    <Card>
      <CardHeader title='Register' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='name'
                value={formik.values.name}
                onChange={formik.handleChange}
                label='Full Name'
                placeholder='Enter your name...'
                error={formik.touched.name && !!formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='phone'
                value={formik.values.phone}
                onChange={formik.handleChange}
                label='Phone'
                placeholder='Enter your phone no...'
                error={formik.touched.phone && !!formik.errors.phone}
                helperText={formik.touched.phone && formik.errors.phone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Phone />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='aadhar'
                value={formik.values.aadhar}
                onChange={formik.handleChange}
                label='Aadhar No.'
                placeholder='Enter your aadhar no...'
                error={formik.touched.aadhar && !!formik.errors.aadhar}
                helperText={formik.touched.aadhar && formik.errors.aadhar}
                InputProps={{
                  startAdornment: <InputAdornment position='start'></InputAdornment>
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <input type='file' name='photo' onChange={e => formik.setFieldValue('photo', e.target.files[0])} />
              {formik.values.photo && <ImagePreview file={formik.values.photo} />}
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' size='large'>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

const ImagePreview = ({ file }) => {
  const [img, setImg] = useState(null)
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => setImg(reader.result)

  return img && <image alt={'Image'} width='500px' height='500px' src={img} />
}

export default AddWorker