import { ThemeProvider, createTheme } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { Web3Modal } from '@web3modal/react'
import { WagmiConfig, configureChains, createConfig, mainnet } from 'wagmi'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { grey } from '@mui/material/colors';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ToastContainer } from 'react-toastify'
import Loading from './components/Loading'
import Routes from './Routes'
import { LoadingProvider } from './contexts/LoadingContext'

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
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
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