import { useMemo } from 'react'
import { TableRow, TableCell, Select, MenuItem, ButtonGroup, Button } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { toast } from 'react-toastify'
import { ISaleStage } from '../../../utils/interfaces'
import { getVisibleDateTime } from '../../../utils/functions'
import { TStatus } from '../../../utils/types'
import useLoading from '../../../hooks/useLoading'
import api from '../../../utils/api'

interface IProps {
  saleStage: ISaleStage;
  openDialogAsEdit: (saleStage: ISaleStage) => void;
}

export default function Row({ saleStage, openDialogAsEdit }: IProps) {
  const { openLoadingAct, closeLoadingAct } = useLoading()

  const status = useMemo<TStatus>(() => {
    return saleStage.enabled;
  }, [saleStage])

  const handleStatus = (e: SelectChangeEvent) => {
    const newStatus = e.target.value;
    openLoadingAct()
    api.put(`/ido/enable-sale-stage/${saleStage.id}`, { newStatus })
      .then(() => {
        closeLoadingAct()
        toast.success('Enabled')
      })
      .catch(error => {
        const errorObject = JSON.parse(JSON.stringify(error))
        console.log('>>>>>>>>>>>>>>>> error of getAllSaleStages => ', errorObject)
        closeLoadingAct()
      })
  }

  const handleDelete = () => {
    openLoadingAct()
    api.delete(`/ido/delete-sale-stage/${saleStage.id}`)
      .then(() => {
        closeLoadingAct()
        toast.success('Deleted')
      })
      .catch(error => {
        const errorObject = JSON.parse(JSON.stringify(error))
        console.log('>>>>>>>>>>>>>>>> error of handleDelete => ', errorObject)
        closeLoadingAct()
      })
  }

  return (
    <TableRow>
      <TableCell>{saleStage.id}</TableCell>
      <TableCell>{saleStage.name}</TableCell>
      <TableCell>${saleStage.scotty_price_in_usd}</TableCell>
      <TableCell>{saleStage.claimed_scotty_amount} SCOTTY</TableCell>
      <TableCell>{saleStage.hard_cap} SCOTTY</TableCell>
      <TableCell>{getVisibleDateTime(new Date(saleStage.start_at))}</TableCell>
      <TableCell>{getVisibleDateTime(new Date(saleStage.end_at))}</TableCell>
      <TableCell>
        <Select
          value={status}
          onChange={handleStatus}
        >
          <MenuItem value="true">Enabled</MenuItem>
          <MenuItem value="false">Disabled</MenuItem>
        </Select>
      </TableCell>
      <TableCell>
        <ButtonGroup>
          <Button onClick={() => openDialogAsEdit(saleStage)}>Edit</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </ButtonGroup>
      </TableCell>
    </TableRow >
  )
}