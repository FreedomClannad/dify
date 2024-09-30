import { createContext } from 'react'

type InputContextType = {
  resultData: string
}
export const ResultContext = createContext<InputContextType>({
  resultData: '',
})
