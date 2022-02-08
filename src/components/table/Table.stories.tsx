import { ComponentStory } from '@storybook/react'
import { data } from '../../fixtures/data'
import { headings } from '../../fixtures/headings'
import { Table } from './Table'

export default {
  title: 'datatable/Table',
  component: Table,
}

const Template: ComponentStory<typeof Table> = () => (
  <Table
    displayedData={data}
    headings={headings}
    ordering={{ key: headings[0].key, order: 'descending' }}
  />
)

export const Default = Template.bind({})
