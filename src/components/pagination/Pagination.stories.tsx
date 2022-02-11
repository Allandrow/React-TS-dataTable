import { ComponentStory } from '@storybook/react'
import { Pagination } from './Pagination'

export default {
  title: 'datatable/Pagination',
  component: Pagination,
  args: {
    callback: (value: number) => console.log(value),
  },
}

const Template: ComponentStory<typeof Pagination> = (args) => <Pagination {...args} />

export const NoData = Template.bind({})
NoData.args = {
  dataLength: 0,
  pageSize: 10,
}

export const OnePage = Template.bind({})
OnePage.args = {
  dataLength: 9,
  pageSize: 10,
  currentPage: 1,
}

export const ManyPagesSuspendRight = Template.bind({})
ManyPagesSuspendRight.args = {
  currentPage: 2,
  dataLength: 100,
  pageSize: 10,
}

export const ManyPagesSuspendLeft = Template.bind({})
ManyPagesSuspendLeft.args = {
  currentPage: 8,
  dataLength: 100,
  pageSize: 10,
}

export const ManyPagesSuspendBoth = Template.bind({})
ManyPagesSuspendBoth.args = {
  currentPage: 5,
  dataLength: 100,
  pageSize: 10,
}

export const Default = Template.bind({})
Default.args = {
  currentPage: 1,
  dataLength: 63,
  pageSize: 10,
}
