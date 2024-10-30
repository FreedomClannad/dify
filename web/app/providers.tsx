'use client'

import * as React from 'react'
import { NextUIProvider } from '@nextui-org/system'
import { useEffect } from 'react'
import WebSocketHook from '@/app/websocket/WebSocketHook'

export type ProvidersProps = {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const { disconnect } = WebSocketHook()
  useEffect(() => {
    return () => {
      disconnect?.()
    }
  }, [])
  return (
    <NextUIProvider style={{ height: '100%' }}>
      {children}
    </NextUIProvider>
  )
}
