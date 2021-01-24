import { ChainId } from '@lychees/uniscam-sdk'

export const useNetworkType = (chainId?: ChainId): 'ETH' | 'BSC' | 'HECO' | null => {
  const ethIds = [ChainId.MAINNET, ChainId.ROPSTEN, ChainId.RINKEBY, ChainId.GÖRLI, ChainId.KOVAN]
  const bscIds = [ChainId.BSC_MAINNET, ChainId.BSC_TESTNET]
  const hecoIds = [ChainId.HECO_MAINNET, ChainId.HECO_TESTNET]
  if (!chainId) return null
  if (ethIds.includes(chainId)) return 'ETH'
  if (bscIds.includes(chainId)) return 'BSC'
  if (hecoIds.includes(chainId)) return 'HECO'
  return null
}

export default useNetworkType
