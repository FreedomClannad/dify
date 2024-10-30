'use client'
import { useEffect } from 'react'
import History from './history'
import WebSocketHook from '@/app/websocket/WebSocketHook'

const Page = () => {
  const { disconnect } = WebSocketHook()
  useEffect(() => {
    return () => {
      disconnect?.()
    }
  }, [])
  return <History />
}

export default Page
