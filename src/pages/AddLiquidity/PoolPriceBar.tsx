import { Currency, ETHER, Percent, Price } from '@lychees/uniscam-sdk'
import React, { useContext } from 'react'
import { Text } from 'rebass'
import { ThemeContext } from 'styled-components'
import { AutoColumn } from '../../components/Column'
import { AutoRow } from '../../components/Row'
import { ONE_BIPS } from '../../constants'
import { useActiveWeb3React } from '../../hooks'
import { Field } from '../../state/mint/actions'
import { TYPE } from '../../theme'

export function PoolPriceBar({
  currencies,
  noLiquidity,
  poolTokenPercentage,
  price
}: {
  currencies: { [field in Field]?: Currency }
  noLiquidity?: boolean
  poolTokenPercentage?: Percent
  price?: Price
}) {
  const theme = useContext(ThemeContext)
  const { chainId } = useActiveWeb3React()
  const format = (currency?: Currency) => {
    if (!currency) return ''
    return currency === ETHER ? currency.toDisplayableSymbol(chainId!) : currency.symbol
  }
  return (
    <AutoColumn gap="md">
      <AutoRow justify="space-around" gap="4px">
        <AutoColumn justify="center">
          <TYPE.black style={{ color: '#fff' }}>{price?.toSignificant(6) ?? '-'}</TYPE.black>
          <Text fontWeight={500} fontSize={14} color={theme.text4} pt={1}>
            {format(currencies[Field.CURRENCY_B])} per {format(currencies[Field.CURRENCY_A])}
          </Text>
        </AutoColumn>
        <AutoColumn justify="center">
          <TYPE.black style={{ color: '#fff' }}>{price?.invert()?.toSignificant(6) ?? '-'}</TYPE.black>
          <Text fontWeight={500} fontSize={14} color={theme.text4} pt={1}>
            {format(currencies[Field.CURRENCY_A])} per {format(currencies[Field.CURRENCY_B])}
          </Text>
        </AutoColumn>
        <AutoColumn justify="center">
          <TYPE.black style={{ color: '#fff' }}>
            {noLiquidity && price
              ? '100'
              : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? '0'}
            %
          </TYPE.black>
          <Text fontWeight={500} fontSize={14} color={theme.text4} pt={1}>
            Share of Pool
          </Text>
        </AutoColumn>
      </AutoRow>
    </AutoColumn>
  )
}
