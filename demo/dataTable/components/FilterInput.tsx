import { FormEvent } from 'react'

interface FilterInputProps {
  handleFiltering: (e: FormEvent<HTMLInputElement>) => void
}

export const FilterInput = ({ handleFiltering }: FilterInputProps) => {
  return (
    <label htmlFor="search">
      <span>Search: </span>
      <input id="search" type="search" onChange={handleFiltering} />
    </label>
  )
}
