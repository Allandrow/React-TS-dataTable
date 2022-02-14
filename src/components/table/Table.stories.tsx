import { ComponentStory } from '@storybook/react'
import { employees } from '../../fixtures/employees'
import { headings } from '../../fixtures/headings'
import { Table } from './Table'

export default {
  title: 'datatable/Table',
  component: Table,
  args: {
    headings: headings,
    ordering: { key: headings[0].key, order: 'descending' },
  },
}

const data = employees.slice(0, 10)

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />

export const Default = Template.bind({})
Default.args = {
  displayedData: data,
}

export const NoData = Template.bind({})
NoData.args = {
  displayedData: [],
}
