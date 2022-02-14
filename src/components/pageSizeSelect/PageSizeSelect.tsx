import { FormEvent } from 'react'

type PageSizeSelectProps = {
  options?: number[]
  callback: (value: number) => void
}

export const PageSizeSelect = ({
  options = [10, 20, 50, 100],
  callback,
}: PageSizeSelectProps) => {
  const handleChange = (e: FormEvent<HTMLSelectElement>) => {
    const value = parseInt(e.currentTarget.value)
    callback(value)
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
