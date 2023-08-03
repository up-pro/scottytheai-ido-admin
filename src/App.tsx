import { ThemeProvider, createTheme } from '@mui/material'
import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Web3Modal } from '@web3modal/react'
import { WagmiConfig, createConfig, mainnet } from 'wagmi'
import { EthereumClient, w3mConnectors } from '@web3modal/ethereum'
import { createPublicClient, http } from 'viem'
import { grey } from '@mui/material/colors';
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
          <Suspense fallback={<Loading />}>
            <LoadingProvider>
              <Routes />
            </LoadingProvider>
          </Suspense>
        </BrowserRouter>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </ThemeProvider>
  )
}