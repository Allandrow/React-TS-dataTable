import { FormEvent } from 'react'

type SearchInputProps = {
  changeSearch: (value: string) => void
}

export const SearchInput = ({ changeSearch }: SearchInputProps) => {
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    changeSearch(e.currentTarget.value.toLowerCase())
  }

  return (
    <label>
      <span>Search: </span>
      <input type="search" onChange={handleChange} />
    </label>
  )
}
