interface FilterInputProps {
  handleFiltering: (value: string, options?: { resetPage: boolean }) => void
}

export const FilterInput = ({ handleFiltering }: FilterInputProps) => {
  return (
    <label htmlFor="search">
      <span>Search: </span>
      <input
        id="search"
        type="search"
        onChange={(e) => handleFiltering(e.currentTarget.value.toLowerCase())}
      />
    </label>
  )
}
