import { ComponentStory } from '@storybook/react'
import { employees } from '../../fixtures/employees'
import { headings } from '../../fixtures/headings'
import { Table } from './Table'

export default {
  title: 'datatable/Table',
  component: Table,
}

const data = employees.slice(0, 10)

const Template: ComponentStory<typeof Table> = () => (
  <Table
    displayedData={data}
    headings={headings}
    ordering={{ key: headings[0].key, order: 'descending' }}
  />
)

export const Default = Template.bind({})
