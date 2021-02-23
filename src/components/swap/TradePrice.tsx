/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { Price } from '@lychees/uniscam-sdk'
import { useContext } from 'react'
import { Repeat } from 'react-feather'
import { Text } from 'rebass'
import { ThemeContext } from 'styled-components'
import { StyledBalanceMaxMini } from './styleds'
import { useTranslation } from 'react-i18next'
import { useActiveWeb3React } from '../../hooks'
import formatSymbol from '../../utils/formatSymbol'
interface TradePriceProps {
  price?: Price
  showInverted: boolean
  setShowInverted: (showInverted: boolean) => void
}

export default function TradePrice({ price, showInverted, setShowInverted }: TradePriceProps) {
  const theme = useContext(ThemeContext)
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()

  const formattedPrice = showInverted ? price?.toSignificant(6) : price?.invert()?.toSignificant(6)

  const show = Boolean(price?.baseCurrency && price?.quoteCurrency)
  const quoteSymbol = formatSymbol(price?.quoteCurrency!, chainId)
  const baseSymbol = formatSymbol(price?.baseCurrency!, chainId)
  const label = showInverted ? `${quoteSymbol} ${t('per')} ${baseSymbol}` : `${baseSymbol} ${t('per')} ${quoteSymbol}`

  return (
    <Text
      fontWeight={500}
      fontSize={14}
      color={theme.text2}
      style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}
    >
      {show ? (
        <>
          {formattedPrice ?? '-'} {label}
          <StyledBalanceMaxMini onClick={() => setShowInverted(!showInverted)}>
            <Repeat size={14} />
          </StyledBalanceMaxMini>
        </>
      ) : (
        '-'
      )}
    </Text>
  )
}
