// 获取文件
export const getFile = ({ name, query }: { name: string; query: any }) => {
  const keys = Object.keys(query)
  const values = keys.map(key => `${key}=${query[key]}`)
  return `${process.env.NEXT_PUBLIC_API_PREFIX}/files/utility/${name}?${values.join('&')}`
}
