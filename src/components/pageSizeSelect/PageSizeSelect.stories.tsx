import { ComponentStory } from '@storybook/react'
import { PageSizeSelect } from './PageSizeSelect'

export default {
  title: 'datatable/Select',
  component: PageSizeSelect,
}

const Template: ComponentStory<typeof PageSizeSelect> = () => (
  <PageSizeSelect
    options={[10, 20, 50, 100]}
    changeSize={(value) => console.log(value)}
  />
)

export const Default = Template.bind({})
