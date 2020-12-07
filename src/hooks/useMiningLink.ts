import { ChainId } from '@lychees/uniscam-sdk'
import useNetworkType from './useNetworkType'

export const useMiningLink = (chainId?: ChainId): string => {
  const type = useNetworkType(chainId)
  if (!chainId) return oldInfoLink
  if (type === 'ETH') return 'https://eth-mining.unisave.exchange'
  if (type === 'BSC') return 'https://bsc-mining.unisave.exchange'
  const default = 'https://bsc-mining.unisave.exchange'
  return default
}

export default useMiningLink
