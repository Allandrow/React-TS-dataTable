import { ComponentStory } from '@storybook/react'
import { DataTable } from './DataTable'
import '../styles/demo.css'

export default {
  title: 'dataTable/Datatable',
  component: DataTable,
}

const Template: ComponentStory<typeof DataTable> = (args) => <DataTable {...args} />

export const Default = Template.bind({})
