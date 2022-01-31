import { ComponentStory } from '@storybook/react'
import { TextRecap } from './TextRecap'

export default {
  title: 'datatable/text-recap',
  component: TextRecap,
}

const Template: ComponentStory<typeof TextRecap> = () => <TextRecap />

export const Default = Template.bind({})
