import { ComponentStory } from '@storybook/react'
import { SearchInput } from './SearchInput'

export default {
  title: 'DataTable/Search',
  component: SearchInput,
}

const Template: ComponentStory<typeof SearchInput> = () => (
  <SearchInput value={''} callback={(e) => console.log(e.currentTarget.value)} />
)

export const Default = Template.bind({})
