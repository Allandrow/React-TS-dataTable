import { FormEvent } from 'react'

interface PageSizeSelectProps {
  options: number[]
  handlePageSizing: (value: number, options?: { resetPage: boolean }) => void
}

export const PageSizeSelect = ({ options, handlePageSizing }: PageSizeSelectProps) => {
  const handleChange = (e: FormEvent<HTMLSelectElement>) => {
    const value = parseInt(e.currentTarget.value, 10)
    handlePageSizing(value)
  }
  return (
    <label htmlFor="entries">
      <span>Show</span>
      <select
        id="entries"
        name="entries"
        onChange={handleChange}
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
