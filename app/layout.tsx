import type { Metadata } from 'next'
import './css/globals.css'

import localFont from 'next/font/local'
import StoreProvider from './StoreProvider'

const glysa = localFont({
  src: '../public/fonts/Glysa.otf',
  display: 'swap',
  variable: '--font-glysa'
})
const lexend = localFont({
  src: '../public/fonts/LexendDeca.ttf',
  display: 'swap',
  variable: '--font-lexend'
})

export const metadata: Metadata = {
  title: 'UX studio contacts challange'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${glysa.variable} ${lexend.variable}`}>
        <StoreProvider>
            {children}
        </StoreProvider>
      </body>
    </html>
  )
}
