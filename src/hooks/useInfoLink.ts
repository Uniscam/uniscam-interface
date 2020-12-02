import { ChainId } from '@lychees/uniscam-sdk'
import useNetworkType from './useNetworkType'

export const useInfoLink = (chainId?: ChainId): string => {
  const type = useNetworkType(chainId)
  const oldInfoLink = 'https://info.y3d.finance/'
  if (!chainId) return oldInfoLink
  if (type === 'ETH') return 'https://eth-info.unisave.exchange'
  if (type === 'BSC') return 'https://bsc-info.unisave.exchange'
  return oldInfoLink
}

export default useInfoLink
