import { ComponentStory } from '@storybook/react'
import { employees } from '../../fixtures/employees'
import { headings } from '../../fixtures/headings'
import { DataTable } from './DataTable'

export default {
  title: 'datatable/DataTable',
  component: DataTable,
}

const Template: ComponentStory<typeof DataTable> = (args) => <DataTable {...args} />

export const Default = Template.bind({})
Default.args = {
  data: employees,
  headings,
}
