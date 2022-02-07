import { ComponentStory } from '@storybook/react'
import { SearchInput } from './SearchInput'

export default {
  title: 'datatable/Search',
  component: SearchInput,
}

const Template: ComponentStory<typeof SearchInput> = () => (
  <SearchInput callback={(value) => console.log(value)} />
)

export const Default = Template.bind({})
