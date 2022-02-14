import { FormEvent } from 'react'

type SearchInputProps = {
  callback: (value: string) => void
}

export const SearchInput = ({ callback }: SearchInputProps) => {
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    callback(value)
  }

  return (
    <label>
      <span>Search: </span>
      <input type="search" onChange={handleChange} />
    </label>
  )
}
