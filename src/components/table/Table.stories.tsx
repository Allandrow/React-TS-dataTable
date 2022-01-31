import { ComponentStory } from '@storybook/react'
import { Table } from './Table'

export default {
  title: 'datatable/Table',
  component: Table,
}

const Template: ComponentStory<typeof Table> = () => <Table />

export const Default = Template.bind({})
