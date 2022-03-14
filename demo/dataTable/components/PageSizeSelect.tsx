import { FormEvent } from 'react'
import { HandleStateChange } from '../../../src/hooks/useTable/useTable'

interface PageSizeSelectProps {
  options: number[]
  handleStateChange: HandleStateChange
}

export const PageSizeSelect = ({ options, handleStateChange }: PageSizeSelectProps) => {
  const handleChange = (e: FormEvent<HTMLSelectElement>) => {
    const value = parseInt(e.currentTarget.value, 10)
    handleStateChange('pageSize', value)
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
