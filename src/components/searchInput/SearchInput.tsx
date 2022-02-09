import { FormEvent } from 'react'

type SearchInputProps = {
  callback: (e: FormEvent<HTMLInputElement>) => void
}

export const SearchInput = ({ callback }: SearchInputProps) => {
  return (
    <label>
      <span>Search: </span>
      <input type="search" onChange={callback} />
    </label>
  )
}
