import { ComponentStory } from '@storybook/react'
import { employees } from '../../fixtures/employees'
import { columns } from '../../fixtures/columns'
import { DataTable } from './DataTable'
import '../../index.css'
import '../../app.css'

export default {
  title: 'datatable/DataTable',
  component: DataTable,
}

const Template: ComponentStory<typeof DataTable> = (args) => <DataTable {...args} />

export const Default = Template.bind({})
Default.args = {
  data: employees,
  columns,
}
