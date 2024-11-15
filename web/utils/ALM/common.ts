/**
 * 复制
 * @param text 传入要复制的文本
 */
export function CopyClipboard(text: string) {
  return new Promise((resolve, reject) => {
    try {
      const oInput = document.createElement('textarea')
      oInput.value = text.replace(/\\n/g, '\n')
      document.body.appendChild(oInput)
      oInput.select()
      document.execCommand('Copy') // 执行浏览器复制命令
      oInput.remove()
      resolve('success')
    }
    catch (e) {
      reject(e)
    }
  })
}
