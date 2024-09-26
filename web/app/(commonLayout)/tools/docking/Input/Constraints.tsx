import { Button, Radio, RadioGroup } from '@nextui-org/react'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
const Constraints = () => {
  return <VerticalTitleCard title="Constraints" tooltip="Constraints 条件">
    <div>
      <RadioGroup
        label="Select your favorite city"
      >
        <Radio value="buenos-aires">Buenos Aires</Radio>
        <Radio value="sydney">Sydney</Radio>
        <Radio value="san-francisco">San Francisco</Radio>
        <Radio value="london">London</Radio>
        <Radio value="tokyo">Tokyo</Radio>
      </RadioGroup>
      <Button color="primary">
        Button
      </Button>

    </div>
  </VerticalTitleCard>
}

export default Constraints
