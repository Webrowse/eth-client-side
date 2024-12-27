import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, useAccount, useConnect, useConnectors, useDisconnect } from 'wagmi'
import { useReadContract } from 'wagmi'
import './App.css'
import { config } from './config'

const client = new QueryClient();

function App() {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <ConnectWallet />
        <TotalSupply />
     </QueryClientProvider>
    </WagmiProvider>
  )
}
function TotalSupply() {
  const { data, isLoading, error } = useReadContract({
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    abi: [
        {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
            "name": "",
            "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
        }
    ],
    functionName: 'totalSupply',
  })

  return (
    <div>
        Total supply  - {JSON.stringify(data?.toString())}
    </div>
  )
}

function ConnectWallet() {
  const { address } = useAccount()
  const connectors = useConnectors()
  const { disconnect } = useDisconnect();
  const {connect} = useConnect();

  if (address) {
    return <div>
      You are connected {address}
      <button onClick={() => {
        disconnect()
      }}>Disconnect</button>
    </div>
  }

  return <div>
    {connectors.map(connector => <button onClick={() => {
      connect({connector: connector})
    }}>
      Connect via {connector.name}
    </button>)}
  </div>
}

export default App