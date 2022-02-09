import { ComponentStory } from '@storybook/react'
import { Recap } from './Recap'

export default {
  title: 'datatable/Recap',
  component: Recap,
}

const Template: ComponentStory<typeof Recap> = (args) => <Recap {...args} />

export const NoResult = Template.bind({})
NoResult.args = {
  dataLength: 0,
}

export const NoFilteredResult = Template.bind({})
NoFilteredResult.args = {
  dataLength: 53,
  filteredDataLength: 0,
}

export const FilteredResult = Template.bind({})
FilteredResult.args = {
  dataLength: 54,
  filteredDataLength: 28,
  currentPage: 2,
  pageSize: 10,
}

export const DefaultResult = Template.bind({})
DefaultResult.args = {
  dataLength: 53,
  currentPage: 3,
  pageSize: 20,
}
