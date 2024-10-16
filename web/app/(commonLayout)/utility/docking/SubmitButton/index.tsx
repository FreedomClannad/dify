import { Button } from '@nextui-org/react'
type Props = {
  runLoading?: boolean
  onReset?: () => void
}
const SubmitButton = ({ runLoading = false, onReset }: Props) => {
  return <>
    <div className="w-full flex justify-center gap-x-4">
      <div className="flex justify-center w-full mt-6">
        <Button type="submit" color="primary" radius="sm" fullWidth isLoading={runLoading}>Run</Button>
      </div>
      <div className="flex justify-center w-full mt-6">
        <Button color="primary" radius="sm" fullWidth onClick={() => {
          onReset?.()
        }}>Reset</Button>
      </div>
    </div>
  </>
}

export default SubmitButton
