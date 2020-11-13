import { Currency, Token } from '@lychees/uniscam-sdk'

export function currencyId(currency: Currency): string {
  if (currency.isMainCurrency()) return 'CURRENCY'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}
