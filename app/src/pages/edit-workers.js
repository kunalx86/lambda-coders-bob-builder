import { useMutation, useQuery, useQueryClient } from 'react-query'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material'
import { axios } from 'src/axios'
import { Loading } from 'mdi-material-ui'
import { useState } from 'react'

const MySwal = withReactContent(Swal)

const EditWorker = () => {
  const { data, status } = useQuery('workers', async () => {
    const response = await axios.get('/getworker')

    return response.data
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(
    async aadhar => {
      const response = await axios.delete(`/deleteworker/${aadhar}`)

      return response.data
    },
    {
      onSettled: _ => {
        queryClient.invalidateQueries('workers')
      }
    }
  )

  return (
    <Grid>
      <TableContainer
        sx={{
          width: 1000
        }}
      >
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align='right'>Phone No</TableCell>
              <TableCell align='right'>Attendance</TableCell>
              <TableCell align='right'>Basic Salary</TableCell>
              <TableCell align='right'>Safety Status</TableCell>
              <TableCell align='center'>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {status === 'loading' && <Loading />}
            {(data || []).map(worker => (
              <TableRow
                key={worker.w_id}
                sx={{
                  '&:last-of-type td, &:last-of-type th': {
                    border: 0
                  }
                }}
              >
                <TableCell component='th' scope='row'>
                  {worker.Name}
                </TableCell>
                <TableCell align='right'>{worker.phone}</TableCell>
                <TableCell align='right'>{worker.attendance}</TableCell>
                <TableCell align='right'>{worker['basic salary']}</TableCell>
                <TableCell align='right'>{worker.safty_status}</TableCell>
                <TableCell align='right'>
                  <Button
                    disabled={loading}
                    variant='outlined'
                    onClick={async () => {
                      setLoading(true)
                      await mutateAsync(worker.aadhar)
                      MySwal.fire({
                        title: 'Deleted Successfully'
                      })
                      setLoading(false)
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}

export default EditWorker
