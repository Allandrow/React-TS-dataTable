import { ComponentStory } from '@storybook/react'
import { employees } from '../../fixtures/employees'
import { columns } from '../../fixtures/columns'
import { Table } from './Table'

export default {
  title: 'datatable/Table',
  component: Table,
  args: {
    columns: columns,
    sorting: { key: columns[0].key, direction: 'descending' },
  },
}

const data = employees.slice(0, 10)

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />

export const Default = Template.bind({})
Default.args = {
  displayedData: { data, filtered: false },
}

export const NoData = Template.bind({})
NoData.args = {
  displayedData: { data: [], filtered: false },
}

export const NoFilteredData = Template.bind({})
NoFilteredData.args = {
  displayedData: { data: [], filtered: true },
}
