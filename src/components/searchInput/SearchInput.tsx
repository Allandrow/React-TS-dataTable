import { FormEvent } from 'react'

type SearchInputProps = {
  value: string
  callback: (e: FormEvent<HTMLInputElement>) => void
}

export const SearchInput = ({ value, callback }: SearchInputProps) => {
  return (
    <label>
      <span>Search: </span>
      <input type="search" value={value} onChange={callback} />
    </label>
  )
}
