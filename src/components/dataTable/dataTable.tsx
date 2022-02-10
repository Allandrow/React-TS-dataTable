import { Headings } from '../../fixtures/headings'

type DataTableProps = {
  data: Object[]
  headings: Headings
}

export const DataTable = ({ data, headings }: DataTableProps) => {
  /*
    state :
      - searchValue
      - pageSize
      - currentPage
      - ordering
      - displayedData
  */

  // select
  // search
  /*
    Table :
      - headings with ordering
      - displayedData
  */
  // recap
  // pagination

  return <h1>WIP</h1>
}

/*
  rerenders :
    - displayedData when pageSize / searchValue / ordering / currentPage changes
    - pagination when pageSize / displayedData / currentPage changes
    - recap when currentPage / pageSize / searchValue changes
*/
