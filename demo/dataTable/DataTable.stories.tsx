import { ComponentStory } from '@storybook/react'
import { DataTable } from './DataTable'
import '../styles/demo.css'
import { columns, data } from '../fixtures'

export default {
  title: 'dataTable/Datatable',
  component: DataTable,
}

const Template: ComponentStory<typeof DataTable> = (args) => <DataTable {...args} />

export const Default = Template.bind({})
Default.args = {
  columns,
  data,
}

export const NoData = Template.bind({})
NoData.args = {
  columns,
  data: [],
}
