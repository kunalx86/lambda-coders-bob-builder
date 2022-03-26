import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Typography from '@mui/material/Typography'
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const Dashboard = () => {
  const formik = useFormik({
    initialValues: {
      days: ''
    },
    onSubmit: (values, actions) => {
      console.log(values)
    }
  })
  const createData = (name, mon, tue, wed, thur, fri, sat, sun) => {
    return { name, mon, tue, wed, thur, fri, sat, sun }
  }

  const rows = [
    createData('8', '✔️', '', ' ', ''),
    createData('9', '✔️', '', '✔️', '', '✔️', '', '✔️'),
    createData('10', '✔️', '', '✔️', '', '✔️', '', '✔️'),
    createData('11', '✔️', '', '✔️', '', '✔️', '', '✔️'),
    createData('12', '✔️', '', '✔️', '', '✔️', '', '✔️'),
    createData('13', '', '✔️', '✔️', '✔️', '✔️', '✔️', '✔️'),
    createData('14', '', '✔️', '', '✔️', '', '✔️', ''),
    createData('15', '', '✔️', '', '✔️', '', '✔️', ''),
    createData('16', '', '✔️', '', '✔️', '', '✔️', ''),
    createData('17', '', '✔️', '', '✔️', '', '✔️', ''),
    createData('18', '', '', '', '', '', '', '', ''),
    createData('19', '', '', '', '', '', '', '', ''),
    createData('20', '', '', '', '', '', '', '', ''),
    createData('21', '', '', '', '', '', '', '', ''),
    ,
    ''
  ]
  return (
    <div>
      <Card>
        <CardHeader title='Time Table' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>Name : {}</Typography>
            </Grid>
            <IconButton color='primary' >
              <ArrowBackIosNewIcon/>
            </IconButton>
            <IconButton color='primary' >
              <ArrowForwardIosIcon/>
            </IconButton>
          </Grid>
        </CardContent>
      </Card>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 550 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Times</TableCell>
              <TableCell align='right'>Monday</TableCell>
              <TableCell align='right'>Tuesday</TableCell>
              <TableCell align='right'>Wednesday</TableCell>
              <TableCell align='right'>Thursday</TableCell>
              <TableCell align='right'>Friday</TableCell>
              <TableCell align='right'>Saturday</TableCell>
              <TableCell align='right'>Sunday</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow
                key={row.name}
                sx={{
                  '&:last-of-type td, &:last-of-type th': {
                    border: 0
                  }
                }}
              >
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='right'>{row.mon}</TableCell>
                <TableCell align='right'>{row.tue}</TableCell>
                <TableCell align='right'>{row.wed}</TableCell>
                <TableCell align='right'>{row.thur}</TableCell>
                <TableCell align='right'>{row.fri}</TableCell>
                <TableCell align='right'>{row.sat}</TableCell>
                <TableCell align='right'>{row.sun}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Dashboard
