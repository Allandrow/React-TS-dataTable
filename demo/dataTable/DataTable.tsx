import { useTable } from '../../src/hooks/useTable/useTable'
import { columns } from '../fixtures/columns'
import { employees } from '../fixtures/employees'
import { FilterInput } from './components/FilterInput'
import { PageSizeSelect } from './components/PageSizeSelect'
import { Pagination } from './components/Pagination'
import { Summary } from './components/Summary'
import { Table } from './components/Table'

export const DataTable = () => {
  const options = [10, 20, 50, 100]
  const { headers, rows, pagination, summary, handleStateChange } = useTable({
    columns,
    data: employees,
    pageSizeOptions: options,
  })

  return (
    <section className="dataTable">
      <PageSizeSelect options={options} handleStateChange={handleStateChange} />
      <FilterInput handleStateChange={handleStateChange} />
      <Table headers={headers} rows={rows} handleStateChange={handleStateChange} />
      <Summary {...summary} />
      <Pagination {...pagination} />
    </section>
  )
}
