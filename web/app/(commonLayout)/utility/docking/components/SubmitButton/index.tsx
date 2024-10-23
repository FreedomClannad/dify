import { Button } from '@nextui-org/react'
import cn from '@/utils/classnames'
type Props = {
  runLoading?: boolean
  onReset?: () => void
  className?: string
}
const SubmitButton = ({ runLoading = false, onReset, className }: Props) => {
  return <>
    <div className={cn('w-full flex justify-center gap-x-4', className)}>
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
