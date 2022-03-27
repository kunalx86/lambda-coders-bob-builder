import {
  FormControl,
  Grid,
  TextField,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Paper,
  CardHeader
} from '@mui/material'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { useQuery } from 'react-query'
import { axios } from 'src/axios'
import { useDebounce } from 'rooks'
import { useAuthRedirect } from 'src/hooks/useAuthRedirect'

const WorkloadManagement = () => {
  useDebounce(useAuthRedirect, 1000)

  const { data, isLoading } = useQuery(['workers', 'free'], async () => {
    const response = await axios.get('/getworklessworker')

    return response.data
  })

  return (
    <Grid p={2}>
      <Grid p={2}>
        {isLoading
          ? 'Loading'
          : data.map(worker => (
              <Card p={2} key={worker.w_id} sx={{ maxWidth: 345 }} align='center'>
                <CardMedia
                  align='center'
                  component='img'
                  height='140'
                  image={`/images/image/${worker.photo}`}
                  alt='image of worker'
                />
                <CardContent>
                  <Typography variant='body2' color='text.secondary' align='center'>
                    Safety - {worker.safty_status}
                    <br />
                    Attendance - {worker.attendance}
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
                    Hire!
                  </Button>
                </CardContent>
              </Card>
            ))}
        {/* card component ends here */}
      </Grid>
    </Grid>
  )
}

const Dashboard = () => {
  const createData = (name, mon, tue, wed, thur, fri, sat, sun) => {
    return { name, mon, tue, wed, thur, fri, sat, sun }
  }

  const rows = [
    createData('7-8', '✔️', '', ' ', ''),
    createData('8-9', '✔️', '', '✔️', '', '✔️', '', '✔️'),
    createData('9-10', '✔️', '', '✔️', '', '✔️', '', '✔️'),
    createData('10-11', '✔️', '', '✔️', '', '✔️', '', '✔️'),
    createData('11-12', '✔️', '', '✔️', '', '✔️', '', '✔️'),
    createData('12-13', '', '✔️', '✔️', '✔️', '✔️', '✔️', '✔️'),
    createData('13-14', '', '✔️', '', '✔️', '', '✔️', ''),
    createData('14-15', '', '✔️', '', '✔️', '', '✔️', ''),
    createData('15-16', '', '✔️', '', '✔️', '', '✔️', ''),
    createData('16-17', '', '✔️', '', '✔️', '', '✔️', ''),
    createData('17-18', '', '', '', '', '', '', '', ''),
    createData('18-19', '', '', '', '', '', '', '', ''),
    createData('19-20', '', '', '', '', '', '', '', ''),
    createData('20-21', '', '', '', '', '', '', '', ''),
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
              <Typography>Name : Harry</Typography>
            </Grid>
            {/* <IconButton color='primary'>Back</IconButton>
            <IconButton color='primary'>Forward</IconButton> */}
          </Grid>
        </CardContent>
      </Card>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 550 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Hours</TableCell>
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
