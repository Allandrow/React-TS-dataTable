import { FormEvent } from 'react'

interface SelectEntriesProps {
  callback: (e: FormEvent<HTMLSelectElement>) => void
}

export const SelectEntries = ({ callback }: SelectEntriesProps) => {
  return (
    <label>
      <span>Show</span>
      <select name="entries" onChange={callback}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <span>entries</span>
    </label>
  )
}
