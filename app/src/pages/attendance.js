import { Checkbox, Grid, Stack } from '@mui/material'
import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData(
    'Frozen yoghurt',
    <Button size='small' variant='outlined'>
      Yes
    </Button>
  )
]

function BasicTable() {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Present</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell component='th' scope='row'>
                  <Checkbox />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <br />

      <Stack direction='row' alignItems='center' spacing={2}>
        <label htmlFor='contained-button-file'>
          {/* <Input accept="image/*" id="contained-button-file" multiple type="file" /> */}
          Present data by uploading sheet of paper
          <Button ml={2} variant='contained' component='span'>
            Upload
          </Button>
        </label>
      </Stack>
    </>
  )
}

const Attendance = () => {
  return <Grid>Attendance</Grid>
}

export default BasicTable
