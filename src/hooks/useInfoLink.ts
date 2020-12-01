import { ChainId } from '@lychees/uniscam-sdk'

export const useInfoLink = (chainId?: ChainId): string => {
  const ethIds = [ChainId.MAINNET, ChainId.ROPSTEN, ChainId.RINKEBY, ChainId.GÖRLI, ChainId.KOVAN]
  const bscIds = [ChainId.BSC_MAINNET, ChainId.BSC_TESTNET]
  const oldInfoLink = 'https://info.y3d.finance/'
  if (!chainId) return oldInfoLink
  if (ethIds.includes(chainId)) return 'https://eth-info.unisave.exchange'
  if (bscIds.includes(chainId)) return 'https://bsc-info.unisave.exchange'
  return oldInfoLink
}

export default useInfoLink
