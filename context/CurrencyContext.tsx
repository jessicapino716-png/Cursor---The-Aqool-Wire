'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export const EXCHANGE_RATE = 3.75

type Currency = 'SAR' | 'USD'

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  formatValue: (amountInSAR: number) => string
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('SAR')

  const formatValue = useCallback(
    (amountInSAR: number): string => {
      if (currency === 'SAR') {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'SAR',
          maximumFractionDigits: 0,
        }).format(amountInSAR)
      } else {
        const amountInUSD = amountInSAR / EXCHANGE_RATE
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }).format(amountInUSD)
      }
    },
    [currency]
  )

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatValue }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}

