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
import Tesseract from 'tesseract.js'
import { Loading } from 'mdi-material-ui'

function BasicTable() {
  const [file, setFile] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [texts, setTexts] = React.useState([])

  return (
    <>
      <Stack direction='column' alignItems='center'>
        <TableContainer
          sx={{
            width: 300
          }}
          component={Paper}
        >
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Present</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[].map(row => (
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
      </Stack>
      <br />
      <br />

      <Stack direction='column' alignItems='center' spacing={2}>
        <label htmlFor='contained-button-file'>Present data by uploading sheet of paper</label>
        <Grid>
          <input onChange={e => setFile(e.target.files[0])} type='file' />
        </Grid>
        <Button
          onClick={() => {
            setLoading(true)
            Tesseract.recognize(file, 'eng', {
              logger: m => console.log(m)
            })
              .then(res => {
                console.log(res.data)
                setTexts(res.data.lines.map(line => line.text))
              })
              .catch(err => console.error(err))
              .finally(() => setLoading(false))
          }}
        >
          Perform OCR
        </Button>
        <Button onClick={() => setText('')}>Clear Results</Button>
        {loading ? (
          <Loading />
        ) : (
          <TableContainer
            sx={{
              width: 200
            }}
            component={Paper}
          >
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Names in List</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {texts.map((text, idx) => (
                  <TableRow
                    key={idx}
                    sx={{
                      '&:last-of-type td, &:last-of-type th': {
                        border: 0
                      }
                    }}
                  >
                    <TableCell component='th' scope='row'>
                      {text}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Stack>
    </>
  )
}

const Attendance = () => {
  return <Grid>Attendance</Grid>
}

export default BasicTable
