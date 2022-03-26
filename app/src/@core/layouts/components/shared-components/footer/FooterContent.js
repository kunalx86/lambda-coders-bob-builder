// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const FooterContent = () => {
  return (
    <Box
      alignContent='center'
      sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
    >
      <Typography sx={{ mr: 2 }}>
        {`Made with `}
        <Box component='span' sx={{ color: 'error.main' }}>
          ❤️
        </Box>
        {` by Lambda Coders`}
      </Typography>
    </Box>
  )
}

export default FooterContent
