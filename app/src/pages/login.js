// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import { Loading } from 'mdi-material-ui'

// ** Icons Imports
import MessageOutline from 'mdi-material-ui/MessageOutline'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { aadharVerify } from 'src/utils/aadharVerify'
import { Email } from 'mdi-material-ui'
import { useAuth } from 'src/hooks/useAuth'

const loginSchema = yup.object().shape({
  email: yup.string().email('Email is not valid').required('Email is required'),
  password: yup.string().min(3, 'Password must be atleast 3 characters long').required('Password is required')
})

const LoginForm = () => {
  const { login } = useAuth()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: async ({ email, password }, actions) => {
      // TODO: Implement login
      actions.setSubmitting(true)
      login({
        email,
        password
      })
      actions.setSubmitting(false)
    }
  })

  return (
    <Card>
      <CardHeader title='Login' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                label='Email'
                placeholder='Enter your email...'
                error={!!formik.errors.email}
                helperText={formik.errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Email />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='password'
                label='Password'
                type='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                error={!!formik.errors.password}
                helperText={formik.errors.password}
                placeholder='Password...'
                sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <MessageOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button disabled={formik.isSubmitting} type='submit' variant='contained' size='large'>
                {formik.isSubmitting && <Loading />}Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default LoginForm
