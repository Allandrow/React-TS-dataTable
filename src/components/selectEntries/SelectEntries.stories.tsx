import { ComponentStory } from '@storybook/react'
import { SelectEntries } from './SelectEntries'

export default {
  title: 'datatable/select',
  component: SelectEntries,
}

const Template: ComponentStory<typeof SelectEntries> = () => (
  <SelectEntries callback={(e) => console.log(e.currentTarget.value)} />
)

export const Default = Template.bind({})
