import { Button, Container, Stack, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useWeb3Modal } from '@web3modal/react'
import { Link } from "react-router-dom"
import { useAccount, useDisconnect, useNetwork, useSwitchNetwork } from "wagmi"
import { CHAIN_ID } from "../../utils/constants"

const OWNER_WALLET = import.meta.env.VITE_OWNER_WALLET || ''

export default function WalletVerify() {
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()
  const { switchNetwork } = useSwitchNetwork()
  const { chain } = useNetwork()
  const { disconnect } = useDisconnect()

  return (
    <Container>
      <Stack spacing={2} alignItems="center" justifyContent="center">
        {address && (
          <Typography textAlign="center" color={grey[100]}>
            {address}
          </Typography>
        )}

        {isConnected ? chain?.id === CHAIN_ID ? (
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={() => disconnect?.()}>
              Disconnect
            </Button>
            {address === OWNER_WALLET && (
              <Button variant="contained" component={Link} to="/dashboard">
                Go to Dashboard
              </Button>
            )}
          </Stack>
        ) : (
          <Button variant="contained" onClick={() => switchNetwork?.(CHAIN_ID)}>
            Switch Network
          </Button>
        ) : (
          <Button variant="contained" onClick={() => open?.()}>
            Connect Wallet
          </Button>
        )}
      </Stack>
    </Container >
  )
}