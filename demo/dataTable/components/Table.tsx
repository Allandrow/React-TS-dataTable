import { Header, Row, HandleSorting } from '../../../src/types'
import { TableBody } from './TableBody'
import { TableHeader } from './TableHeader'

interface TableProps {
  headers: Header[]
  rows: Row[]
  isFiltered: boolean
  handleSorting: HandleSorting
}

export const Table = ({ headers, rows, isFiltered, handleSorting }: TableProps) => {
  return (
    <table>
      <TableHeader headers={headers} handleSorting={handleSorting} />
      <TableBody rows={rows} length={headers.length} isFiltered={isFiltered} />
    </table>
  )
}
