import { useTable } from '../../src'
import { FilterInput } from './components/FilterInput'
import { PageSizeSelect } from './components/PageSizeSelect'
import { Pagination } from './components/Pagination'
import { Summary } from './components/Summary'
import { Table } from './components/Table'
import { Data, DefaultColumn, UseTableValues } from '../../src/types'

interface DataTableProps {
  columns: DefaultColumn[]
  data: Data[]
  options?: number[]
}

export const DataTable = ({
  columns,
  data,
  options = [10, 20, 50, 100],
}: DataTableProps) => {
  const {
    headers,
    rows,
    pagination,
    summary,
    isFiltered,
    handleSorting,
    handlePageSizing,
    handleFiltering,
    handlePageChange,
  }: UseTableValues = useTable({
    columns,
    data,
    pageSizeOptions: options,
  })

  return (
    <section className="dataTable">
      <PageSizeSelect options={options} handlePageSizing={handlePageSizing} />
      <FilterInput handleFiltering={handleFiltering} />
      <Table
        headers={headers}
        rows={rows}
        handleSorting={handleSorting}
        isFiltered={isFiltered}
      />
      <Summary {...summary} />
      <Pagination pagination={pagination} handlePageChange={handlePageChange} />
    </section>
  )
}
