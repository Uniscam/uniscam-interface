import { ChainId } from '@lychees/uniscam-sdk'
import useNetworkType from './useNetworkType'

export const useMiningLink = (chainId?: ChainId): string => {
  const type = useNetworkType(chainId)
  const oldLink = 'https://bsc-mining.unisave.exchange'
  if (!chainId) return oldLink
  if (type === 'ETH') return 'https://eth-mining.unisave.exchange'
  if (type === 'BSC') return 'https://bsc-mining.unisave.exchange'
  return oldLink
}

export default useMiningLink
