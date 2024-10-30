import { useWebSocket } from 'ahooks'
import { useEffect } from 'react'
import { PocketWebsocket } from '@/app/websocket/pocketWebsocket'

class WebSocketShakeHands {
  private timeout = 10000 // 5秒一次心跳
  private timeoutObj: any
  private serverTimeoutObj: any

  reset() {
    clearTimeout(this.timeoutObj)
    clearTimeout(this.serverTimeoutObj)
  }

  start(ws: WebSocket) {
    this.timeoutObj = setTimeout(() => {
      // 这里发送一个心跳信息，后端接收后，返回一个消息，在onmessage拿到返回的心跳（信息）就说明连接正常
      ws.send(JSON.stringify({ ping: '' }))

      // 如果超过一定时间还没重置，就说明后端主动断开了
      this.serverTimeoutObj = setTimeout(() => {
        // 如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
        ws.close()
      }, this.timeout)
    }, this.timeout)
  }
}

const WsShakeHands = new WebSocketShakeHands()

const WebSocketHook = () => {
  // token连接地址
  const getWSURL = () => {
    const protocol: string = window.location.protocol
    if (protocol === 'https:')
      return `wss://${window.location.host}/ws`
    else
      return `ws://${window.location.host}/ws`
      // return 'ws://192.168.1.144:5002/ws'
  }

  // 连接地址
  const getURL = () => {
    const token = localStorage.getItem('console_token') || ''
    return `${getWSURL()}?token=Bearer ${token}`
  }
  /**
     * webSocket连接成功回调
     */
  const onOpen = (_: WebSocketEventMap['open'], instance: WebSocket) => {
    console.log('开启WebSocket')
    WsShakeHands.reset()
    WsShakeHands.start(instance)
  }
  /**
     * webSocket关闭回调
     */
  const onClose = () => {
    console.log('关闭WebSocket')
    WsShakeHands.reset()
  }
  /**
     * webSocket错误回调
     */
  const onError = () => {
    console.log('WebSocket错误')
  }

  /**
     * 数据处理器
     */
  const dataHandler = (data: any) => {
    console.log('WebSocket后端返回数据:', data)
    if (data && data !== 'pong') {
      try {
        const n_obj = JSON.parse(data)
        console.log('JSON:', n_obj)
        if ('molecular_docking' in n_obj)
          PocketWebsocket(n_obj.molecular_docking)
      }
      catch (e) {
        console.log(e)
      }
    }
  }

  const { readyState, sendMessage, latestMessage, disconnect, connect, webSocketIns } = useWebSocket(getURL(), {
    onOpen,
    onClose,
    onError,
    reconnectLimit: 20,
  })

  useEffect(() => {
    if (webSocketIns) {
      WsShakeHands.reset()
      WsShakeHands.start(webSocketIns)
    }

    dataHandler(latestMessage?.data)
  }, [latestMessage])

  return { readyState, sendMessage, latestMessage, disconnect, connect }
}
export default WebSocketHook
