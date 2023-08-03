import { Button } from "@mui/material"
import { useWeb3Modal } from '@web3modal/react'

export default function WalletVerify() {
  const { open } = useWeb3Modal()

  return (
    <Button variant="contained" onClick={() => open?.()}>
      Connect Wallet
    </Button>
  )
}