import { FormEvent } from 'react'

interface PageSizeSelectProps {
  options: number[]
  handlePageSizing: (value: FormEvent<HTMLSelectElement>) => void
}

export const PageSizeSelect = ({ options, handlePageSizing }: PageSizeSelectProps) => {
  return (
    <label htmlFor="entries">
      <span>Show</span>
      <select
        id="entries"
        name="entries"
        onChange={handlePageSizing}
        defaultValue={options[0]}
      >
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
