import { DefaultColumn, Header, SortBy } from '../useTable/useTable'

interface HeaderProps {
  columns: DefaultColumn[]
  sorting: SortBy
  handleSorting: (value: SortBy) => void
}

export const useHeader = ({ columns, handleSorting }: HeaderProps): Header[] => {
  return columns.map(({ header, id }) => {
    return {
      id: id,
      text: header,
      handleSorting,
    }
  })
}
