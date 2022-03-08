import { useTable } from '../../src/hooks/useTable/useTable'
import { columns } from '../fixtures/columns'
import { employees } from '../fixtures/employees'
import { FilterInput } from './components/FilterInput'
import { Table } from './components/Table'

export const DataTable = () => {
  const { headers, rows, handleFiltering } = useTable({ columns, data: employees })

  return (
    <>
      <FilterInput handleFiltering={handleFiltering} />
      <Table headers={headers} rows={rows} />
    </>
  )
}
