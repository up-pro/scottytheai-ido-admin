import { useState, useEffect } from 'react'
import { Container, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
import api from '../../../utils/api'
import { ISaleStage } from '../../../utils/interfaces'
import { INTERVAL_TIME } from '../../../utils/constants'
import Row from './Row'

export default function SaleStage() {
  const [saleStages, setSaleStages] = useState<Array<ISaleStage>>([])

  const getAllSaleStages = () => {
    api.get('/ido/get-all-sale-stages')
      .then(res => {
        setSaleStages(res.data)
      })
      .catch(error => {
        const errorObject = JSON.parse(JSON.stringify(error))
        console.log('>>>>>>>>>>>>>>>> error of getAllSaleStages => ', errorObject)
      })
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      getAllSaleStages()
    }, INTERVAL_TIME)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <Container maxWidth="xl">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Scotty Price</TableCell>
              <TableCell>Claimed Amount</TableCell>
              <TableCell>Hard Cap</TableCell>
              <TableCell>Start at</TableCell>
              <TableCell>End at</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {saleStages.map(saleStage => (
              <Row key={saleStage.id} saleStage={saleStage} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}