import { FormEvent } from 'react'
import { HandleStateChange } from '../../../src/hooks/useTable/useTable'

interface FilterInputProps {
  handleStateChange: HandleStateChange
}

export const FilterInput = ({ handleStateChange }: FilterInputProps) => {
  const handleFiltering = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.toLowerCase()
    handleStateChange('filter', value)
  }
  return (
    <label htmlFor="search">
      <span>Search: </span>
      <input id="search" type="search" onChange={handleFiltering} />
    </label>
  )
}
