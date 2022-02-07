import { FormEvent, useState } from 'react'

type SearchInputProps = {
  callback: (value: string) => void
}

export const SearchInput = ({ callback }: SearchInputProps) => {
  const [searchValue, setSearchValue] = useState('')

  // TODO : is it really needed to handle local state ?
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setSearchValue(value)
    callback(value)
  }

  return (
    <label>
      <span>Search: </span>
      <input type="search" value={searchValue} onInput={handleChange} />
    </label>
  )
}
