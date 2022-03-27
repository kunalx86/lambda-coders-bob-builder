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
import { useQuery, useQueryClient } from 'react-query'
import { axios } from 'src/axios'

function BasicTable() {
  const [file, setFile] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [texts, setTexts] = React.useState([])
  const [checks, setChecks] = React.useState([])

  const { data, isLoading } = useQuery('workers', async () => {
    const response = await axios.get('/getworker')

    return response.data
  })

  const queryClient = useQueryClient()

  React.useEffect(() => {
    setChecks(Array.from({ length: (data || []).length }).fill(false))
  }, [data])

  const handleSubmit = () => {
    queryClient.setQueryData('workers', [])
    setTexts([])
  }

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
              {(data || []).map((row, idx) => (
                <TableRow key={row.w_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    {row.Name}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    <Checkbox
                      value={checks[idx]}
                      onChange={e => {
                        setChecks(prev => prev.map((check, i) => (i === idx ? !check : check)))
                      }}
                    />
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
        <Button onClick={() => setTexts([])}>Clear Results</Button>
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
        <Button onClick={() => handleSubmit()}>Post Attendance</Button>
      </Stack>
    </>
  )
}

const Attendance = () => {
  return <Grid>Attendance</Grid>
}

export default BasicTable
