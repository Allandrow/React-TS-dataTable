import { FormEvent } from 'react'

interface SelectEntriesProps {
  options?: number[]
  callback: (e: FormEvent<HTMLSelectElement>) => void
}

export const SelectEntries = ({
  options = [10, 20, 50, 100],
  callback,
}: SelectEntriesProps) => {
  return (
    <label>
      <span>Show</span>
      <select name="entries" onChange={callback}>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <span>entries</span>
    </label>
  )
}
