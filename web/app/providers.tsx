'use client'

import * as React from 'react'
import { NextUIProvider } from '@nextui-org/system'

export type ProvidersProps = {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <NextUIProvider style={{ height: '100%' }}>
      {children}
    </NextUIProvider>
  )
}