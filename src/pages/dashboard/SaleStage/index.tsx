import { useState, useEffect } from 'react'
import { Container, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Stack, Button } from '@mui/material'
import api from '../../../utils/api'
import { ISaleStage } from '../../../utils/interfaces'
import { INTERVAL_TIME } from '../../../utils/constants'
import Row from './Row'
import EditDialog from './EditDialog'

export default function SaleStage() {
  const [saleStages, setSaleStages] = useState<Array<ISaleStage>>([])
  const [dialogOpened, setDialogOpened] = useState<boolean>(false)
  const [openedSaleStage, setOpenedSaleStage] = useState<ISaleStage | null>(null)

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

  const openDialogAsEdit = (saleStage: ISaleStage) => {
    setOpenedSaleStage(saleStage)
    setDialogOpened(true)
  }

  const openDialogAsCreate = () => {
    setOpenedSaleStage(null)
    setDialogOpened(true)
  }

  const closeDialog = () => {
    setOpenedSaleStage(null)
    setDialogOpened(false)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      getAllSaleStages()
    }, INTERVAL_TIME)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <Container maxWidth="xl">
      <Stack spacing={4}>
        <Stack direction="row" justifyContent="end">
          <Button variant="contained" onClick={() => openDialogAsCreate()}>
            Create New
          </Button>
        </Stack>

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
                <Row key={saleStage.id} saleStage={saleStage} openDialogAsEdit={openDialogAsEdit} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      <EditDialog
        opened={dialogOpened}
        setOpened={setDialogOpened}
        saleStage={openedSaleStage}
        closeDialog={closeDialog}
      />
    </Container>
  )
}