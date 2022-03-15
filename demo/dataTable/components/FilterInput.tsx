import { HandleFiltering } from '../../../src/hooks/useTable/useTable'

interface FilterInputProps {
  handleFiltering: HandleFiltering
}

export const FilterInput = ({ handleFiltering }: FilterInputProps) => {
  return (
    <label htmlFor="search">
      <span>Search: </span>
      <input
        id="search"
        type="search"
        onChange={(e) => handleFiltering(e.currentTarget.value)}
      />
    </label>
  )
}
