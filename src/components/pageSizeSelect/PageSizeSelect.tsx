import { FormEvent } from 'react'

interface PageSizeSelectProps {
  options: number[]
  changeSize: (value: number) => void
}

export const PageSizeSelect = ({ options, changeSize }: PageSizeSelectProps) => {
  const handleChange = (e: FormEvent<HTMLSelectElement>) => {
    changeSize(parseInt(e.currentTarget.value, 10))
  }

  return (
    <label>
      <span>Show</span>
      <select name="entries" onChange={handleChange}>
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
