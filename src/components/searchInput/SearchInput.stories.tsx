import { ComponentStory } from '@storybook/react'
import { SearchInput } from './SearchInput'

export default {
  title: 'datatable/Search',
  component: SearchInput,
}

const Template: ComponentStory<typeof SearchInput> = () => (
  <SearchInput changeSearch={(e) => console.log(e.currentTarget.value)} />
)

export const Default = Template.bind({})
