// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import { FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup } from '@mui/material'
import { Loading } from 'mdi-material-ui'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Email } from 'mdi-material-ui'
import { useAuth } from 'src/hooks/useAuth'
import { aadharVerify } from 'src/utils/aadharVerify'

const registerSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Email is not valid').required('Email is required'),
  password: yup.string().min(3, 'Password must be atleast 3 characters long').required('Password is required')
})

const RegisterForm = () => {
  const { register } = useAuth()

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      email: '',
      aadhar: '',
      type: 'Contractor'
    },
    validationSchema: registerSchema,
    validate: ({ aadhar }) => {
      if (!aadharVerify(aadhar)) {
        return {
          aadhar: 'Not a valid aadhar number'
        }
      }
    },
    onSubmit: async ({ name, password, email, aadhar }, actions) => {
      // TODO: Implement register
      register({
        name,
        email,
        password,
        aadhar
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
                id='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                label='Email'
                placeholder='Enter your email...'
                error={formik.touched.email && !!formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
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
                id='aadhar'
                value={formik.values.aadhar}
                onChange={formik.handleChange}
                label='Email'
                placeholder='Enter your aadhar no...'
                error={formik.touched.aadhar && !!formik.errors.aadhar}
                helperText={formik.touched.aadhar && formik.errors.aadhar}
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
              <FormHelperText>Account Type</FormHelperText>
              <RadioGroup name='type' value={formik.values.type} onChange={formik.handleChange}>
                <FormControlLabel value='Contractor' control={<Radio />} label='Contractor' />
                <FormControlLabel value='Owner' control={<Radio />} label='Owner' />
              </RadioGroup>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id='password'
                label='Password'
                type='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && !!formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
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

export default RegisterForm
