import { ChainId, Currency, ETHER, Token } from '@lychees/uniscam-sdk'
import React, { useMemo } from 'react'
import styled from 'styled-components'

import EthereumLogo from '../../assets/images/ethereum-logo.png'
import BinanceLogo from '../../assets/images/bnb.svg'
import HTLogo from '../../assets/images/ht.png'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import Logo from '../Logo'
import { useActiveWeb3React } from '../../hooks'

const getTokenLogoURL = (chainId: number | undefined, address: string): string => {
  if (chainId === ChainId.BSC_MAINNET || chainId === ChainId.BSC_TESTNET) {
    return `https://tokens.bscswap.com/images/${address}.png`
  }
  if (chainId === ChainId.HECO_MAINNET) {
    return `https://raw.githubusercontent.com/Uniscam/token-icons/master/heco-mainnet/${address.toLowerCase()}.png`
  }

  return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`
}

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const { chainId } = useActiveWeb3React()
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (currency === ETHER) return []

    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, getTokenLogoURL(chainId, currency.address)]
      }

      return [getTokenLogoURL(chainId, currency.address)]
    }
    return []
  }, [currency, uriLocations, chainId])
  if (currency === ETHER) {
    if (chainId === ChainId.BSC_MAINNET || chainId === ChainId.BSC_TESTNET) {
      return <StyledEthereumLogo src={BinanceLogo} size={size} style={style} />
    }
    if (chainId === ChainId.HECO_MAINNET) {
      return <StyledEthereumLogo src={HTLogo} size={size} style={style} />
    }
    return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} />
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
}
