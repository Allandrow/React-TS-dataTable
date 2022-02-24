import { FormEvent } from 'react'

export interface SearchInputProps {
  changeSearch: (e: FormEvent<HTMLInputElement>) => void
}

export const SearchInput = ({ changeSearch }: SearchInputProps) => {
  return (
    <label htmlFor="search">
      <span>Search: </span>
      <input id="search" type="search" onChange={changeSearch} />
    </label>
  )
}
