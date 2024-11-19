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

/**
 * 将SVG字符串转为Base64数据格式
 */
export function svgToBase64(svg: string) {
// 将 SVG 字符串转为 Base64 编码
  const base64Data = btoa(unescape(encodeURIComponent(svg)))
  // 生成 data URI 格式
  return `data:image/svg+xml;base64,${base64Data}`
}
