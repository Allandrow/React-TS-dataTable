import { FormEvent } from 'react'

export interface PageSizeSelectProps {
  options: number[]
  changeSize: (value: number) => void
}

export const PageSizeSelect = ({ options, changeSize }: PageSizeSelectProps) => {
  const handleChange = (e: FormEvent<HTMLSelectElement>) => {
    changeSize(parseInt(e.currentTarget.value, 10))
  }

  return (
    <label htmlFor="entries">
      <span>Show</span>
      <select id="entries" name="entries" onChange={handleChange}>
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
