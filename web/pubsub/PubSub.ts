type EventCallback<T> = (data: T) => void

export class PubSubClass<T> {
  private subscriptions: { [event: string]: EventCallback<T>[] } = {}

  subscribe(event: string, callback: EventCallback<T>) {
    if (!this.subscriptions[event])
      this.subscriptions[event] = []

    this.subscriptions[event].push(callback)
  }

  publish(event: string, data: T) {
    if (this.subscriptions[event]) {
      this.subscriptions[event].forEach((callback) => {
        // 使用 Promise.resolve 来确保回调函数是异步执行
        Promise.resolve().then(() => callback(data))
      })
    }
  }

  unsubscribe(event: string, callback: EventCallback<T>) {
    if (this.subscriptions[event]) {
      const index = this.subscriptions[event].indexOf(callback)
      if (index !== -1)
        this.subscriptions[event].splice(index, 1)
    }
  }
}

// 订阅事件
// MolecularPubSub.subscribe("event1", data => {
// eslint-disable-next-line no-tabs
// 	console.log("Event 1:", data);
// });
// 发布事件
// MolecularPubSub.publish("event1", "Data for event 1");

// 输出：
// Event 1: Data for event 1
