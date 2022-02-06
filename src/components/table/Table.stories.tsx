import { ComponentStory } from '@storybook/react'
import { data } from '../../fixtures/data'
import { headings } from '../../fixtures/headings'
import { Table } from './Table'

export default {
  title: 'datatable/Table',
  component: Table,
}

const Template: ComponentStory<typeof Table> = () => (
  <Table displayedData={data} headings={headings} />
)

export const Default = Template.bind({})
