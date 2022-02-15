import { FormEvent } from 'react'

type PageSizeSelectProps = {
  options?: number[]
  changeSize: (value: number) => void
}

export const PageSizeSelect = ({
  options = [10, 20, 50, 100],
  changeSize,
}: PageSizeSelectProps) => {
  const handleChange = (e: FormEvent<HTMLSelectElement>) => {
    changeSize(parseInt(e.currentTarget.value))
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
