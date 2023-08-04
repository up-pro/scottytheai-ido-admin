import { useEffect, useState } from "react"
import { Button, ButtonGroup, Container, Stack, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import { toast } from 'react-toastify'
import api from "../../../utils/api"
import { INTERVAL_TIME } from "../../../utils/constants"
import { TStatus } from "../../../utils/types"

export default function ClaimStatus() {
  const [scottyClaimEnabled, setScottyClaimEnabled] = useState<TStatus>('false')

  const getClaimStatus = () => {
    api.get('/ido/get-claim-scotty-status')
      .then(res => {
        console.log('>>>>>>>>>> res.data.claim_scotty_enabled => ', res.data.claim_scotty_enabled)
        setScottyClaimEnabled(res.data.claim_scotty_enabled)
      })
      .catch(error => {
        const errorObject = JSON.parse(JSON.stringify(error))
        console.log('>>>>>>>>>>>>>>>> error of getClaimStatus => ', errorObject)
      })
  }

  const updateClaimStatus = (status: TStatus) => {
    api.put('/ido/update-claim-status', { claimScottyEnabled: status })
      .then(() => {
        setScottyClaimEnabled(status)
        toast.success('Updated.')
      })
      .catch(error => {
        const errorObject = JSON.parse(JSON.stringify(error))
        console.log('>>>>>>>>>>>>>>>> error of getClaimStatus => ', errorObject)
        toast.error('Updated Failed.')
      })
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      getClaimStatus()
    }, INTERVAL_TIME)
    return () => clearInterval(intervalId)
  }, [])
  return (
    <Container>
      <Stack alignItems="center" spacing={2}>
        <Typography>
          Current Status: {scottyClaimEnabled === 'false' ? 'Disabled' : 'Enabled'}
        </Typography>
        <ButtonGroup>
          <Button
            variant="contained"
            sx={{ color: grey[100] }}
            disabled={scottyClaimEnabled === 'false'}
            onClick={() => updateClaimStatus('false')}
          >Disable</Button>
          <Button
            variant="contained"
            sx={{ color: grey[100] }}
            disabled={scottyClaimEnabled === 'true'}
            onClick={() => updateClaimStatus('true')}
          >Enable</Button>
        </ButtonGroup>
      </Stack>
    </Container>
  )
}