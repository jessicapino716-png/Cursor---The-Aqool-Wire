import './globals.css'
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { CurrencyProvider } from '@/context/CurrencyContext'
import { TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Aqool Wire Dashboard',
  description: 'Funding flows and market gap analysis dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn("min-h-screen bg-[#0c0a09] text-foreground font-sans antialiased", inter.variable, jetbrainsMono.variable)}>
        <CurrencyProvider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </CurrencyProvider>
      </body>
    </html>
  )
}

