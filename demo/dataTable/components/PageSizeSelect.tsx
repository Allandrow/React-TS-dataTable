import { HandlePageSizing } from '../../../src/hooks/useTable/useTable'

interface PageSizeSelectProps {
  options: number[]
  handlePageSizing: HandlePageSizing
}

export const PageSizeSelect = ({ options, handlePageSizing }: PageSizeSelectProps) => {
  return (
    <label htmlFor="entries">
      <span>Show</span>
      <select
        id="entries"
        name="entries"
        onChange={(e) => handlePageSizing(parseInt(e.currentTarget.value, 10))}
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
