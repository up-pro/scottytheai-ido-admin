import { ThemeProvider, createTheme } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { Web3Modal } from '@web3modal/react'
import { WagmiConfig, createConfig, mainnet } from 'wagmi'
import { EthereumClient, w3mConnectors } from '@web3modal/ethereum'
import { createPublicClient, http } from 'viem'
import { grey } from '@mui/material/colors';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Loading from './components/Loading'
import Routes from './Routes'
import { LoadingProvider } from './contexts/LoadingContext'
import { ToastContainer } from 'react-toastify'

//  --------------------------------------------------------------------------------------------------

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FD7C1E'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: grey[100]
        }
      }
    }
  }
})

const projectId = import.meta.env.VITE_PROJECT_ID || ''
const chains = [mainnet]
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http()
  })
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

//  --------------------------------------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <WagmiConfig config={wagmiConfig}>
        <BrowserRouter>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <LoadingProvider>
              <Routes />
            </LoadingProvider>
          </LocalizationProvider>
        </BrowserRouter>
      </WagmiConfig>
      <Loading />
      <ToastContainer />
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </ThemeProvider>
  )
}