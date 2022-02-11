import { ComponentStory } from '@storybook/react'
import { PageSizeSelect } from './PageSizeSelect'

export default {
  title: 'datatable/Select',
  component: PageSizeSelect,
}

const Template: ComponentStory<typeof PageSizeSelect> = () => (
  <PageSizeSelect callback={(e) => console.log(e.currentTarget.value)} />
)

export const Default = Template.bind({})
