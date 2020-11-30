/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Currency, CurrencyAmount, Fraction, Percent } from '@lychees/uniscam-sdk'
import React from 'react'
import { Text } from 'rebass'
import { useTranslation } from 'react-i18next'
import { ButtonPrimary } from '../../components/Button'
import { RowBetween, RowFixed } from '../../components/Row'
import CurrencyLogo from '../../components/CurrencyLogo'
import { Field } from '../../state/mint/actions'
import { TYPE } from '../../theme'
import { useActiveWeb3React } from '../../hooks'
import formatSymbol from '../../utils/formatSymbol'

export function ConfirmAddModalBottom({
  noLiquidity,
  price,
  currencies,
  parsedAmounts,
  poolTokenPercentage,
  onAdd
}: {
  noLiquidity?: boolean
  price?: Fraction
  currencies: { [field in Field]?: Currency }
  parsedAmounts: { [field in Field]?: CurrencyAmount }
  poolTokenPercentage?: Percent
  onAdd: () => void
}) {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  const currencyA = currencies[Field.CURRENCY_A]
  const currencyB = currencies[Field.CURRENCY_B]

  return (
    <>
      <RowBetween>
        <TYPE.body style={{ color: '#fff' }}>
          {formatSymbol(currencyA!, chainId)} {t('deposited')}
        </TYPE.body>
        <RowFixed>
          <CurrencyLogo currency={currencyA} style={{ marginRight: '8px' }} />
          <TYPE.body style={{ color: '#fff' }}>{parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)}</TYPE.body>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <TYPE.body style={{ color: '#fff' }}>
          {formatSymbol(currencyB!, chainId)} {t('deposited')}
        </TYPE.body>
        <RowFixed>
          <CurrencyLogo currency={currencyB} style={{ marginRight: '8px' }} />
          <TYPE.body style={{ color: '#fff' }}>{parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)}</TYPE.body>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <TYPE.body style={{ color: '#fff' }}>{t('rates')}</TYPE.body>
        <TYPE.body style={{ color: '#fff' }}>
          {`1 ${formatSymbol(currencyA!, chainId)} = ${price?.toSignificant(4)} ${formatSymbol(currencyB!, chainId)}`}
        </TYPE.body>
      </RowBetween>
      <RowBetween style={{ justifyContent: 'flex-end' }}>
        <TYPE.body style={{ color: '#fff' }}>
          {`1 ${formatSymbol(currencyB!, chainId)} = ${price?.invert().toSignificant(4)} ${formatSymbol(
            currencyA!,
            chainId
          )}`}
        </TYPE.body>
      </RowBetween>
      <RowBetween>
        <TYPE.body style={{ color: '#fff' }}>{t('shareOfPool')}:</TYPE.body>
        <TYPE.body style={{ color: '#fff' }}>{noLiquidity ? '100' : poolTokenPercentage?.toSignificant(4)}%</TYPE.body>
      </RowBetween>
      <ButtonPrimary style={{ margin: '20px 0 0 0' }} onClick={onAdd}>
        <Text fontWeight={500} fontSize={20}>
          {noLiquidity ? t('createPoolAndSupply') : t('confirmSupply')}
        </Text>
      </ButtonPrimary>
    </>
  )
}
