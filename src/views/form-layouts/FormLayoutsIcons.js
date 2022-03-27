// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import { FormControlLabel, FormHelperText, MenuItem, Radio, RadioGroup, Select } from '@mui/material'

// ** Icons Imports
import Phone from 'mdi-material-ui/Phone'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import { useFormik } from 'formik'
import * as yup from 'yup'

const registerSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  phoneNumber: yup
    .string()
    .matches(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/, 'Not a valid phone number')
    .required('Phone number is required'),
  password: yup.string().min(3, 'Password must be atleast 3 characters long').required('Password is required')
})

const FormLayoutsIcons = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      phoneNumber: '',
      password: '',
      type: 'Worker'
    },
    validationSchema: registerSchema,
    onSubmit: (values, actions) => {
      // TODO: Implement register
      console.log(values)
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
              <FormHelperText>Account Type</FormHelperText>
              <RadioGroup name='type' value={formik.values.type} onChange={formik.handleChange}>
                <FormControlLabel value='Worker' control={<Radio />} label='Worker' />
                <FormControlLabel value='Contractor' control={<Radio />} label='Contractor' />
                <FormControlLabel value='Owner' control={<Radio />} label='Owner' />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='phoneNumber'
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                type='number'
                label='Phone No.'
                placeholder='Enter your phone no...'
                error={formik.touched.phoneNumber && !!formik.errors.phoneNumber}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
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

export default FormLayoutsIcons
