import { useState } from 'react'
import { useQuery } from 'react-query'
import { axios } from 'src/axios'
import { Grid, Button } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

function loadScript(src) {
  return new Promise(resolve => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

async function displayRazorpay(amount, name) {
  const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

  if (!res) {
    alert('Razorpay SDK failed to load. Are you online?')

    return
  }

  const options = {
    key: 'rzp_test_plSZYOKdoMS8rp',
    currency: 'INR',
    amount: amount * 100,
    name: 'Monthly Wages',
    description: `Wages for ${name}`,
    handler: function (response) {
      alert(response.razorpay_payment_id)
      alert(response.razorpay_order_id)
      alert(response.razorpay_signature)
    }
  }
  const paymentObject = new window.Razorpay(options)
  paymentObject.open()
}

const Payment = () => {
  return (
    <Grid justifyContent='center' justifyItems='center' alignContent='center' alignItems='center'>
      <TableCollapsible />
    </Grid>
  )
}

const createData = (name, calories, fat, carbs, protein, price) => {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1
      }
    ]
  }
}

const Row = props => {
  // ** Props
  const { row } = props

  // ** State
  const [open, setOpen] = useState(false)

  // Name, basic pay, incentives, total pay
  // Safety %, Average Working hours, Attendance PM

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.Name}
        </TableCell>
        <TableCell align='right'>{row['basic salary']}</TableCell>
        <TableCell align='right'>{row.incentivesalary}</TableCell>
        <TableCell align='right'>{parseInt(row.incentivesalary) + parseInt(row['basic salary'])}</TableCell>
        <TableCell align='right'>
          <Button
            variant='outlined'
            onClick={() => displayRazorpay(parseInt(row.incentivesalary) + parseInt(row['basic salary']), row.Name)}
          >
            Sanction Wages
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ py: '0 !important' }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ m: 2 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Details
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Safety Percentage</TableCell>
                    <TableCell>Average Working Hours</TableCell>
                    <TableCell align='right'>Attendance Per Month</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.w_id}>
                    <TableCell component='th' scope='row'>
                      {row.safty_status}
                    </TableCell>
                    <TableCell>{row.avghoursmonth}</TableCell>
                    <TableCell align='right'>{row.attendance}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
]

const TableCollapsible = () => {
  const { data, status } = useQuery('workers', async () => {
    const response = await axios.get('/getworker')

    return response.data
  })

  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align='right'>Basic Pay</TableCell>
            <TableCell align='right'>Incentives Pay</TableCell>
            <TableCell align='right'>Total Pay</TableCell>
            <TableCell align='right'>Make Payment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(data || []).map(row => (
            <Row key={row.w_id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Payment
