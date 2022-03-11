import { DefaultColumn, Header, SortBy } from '../useTable/useTable'

interface HeaderProps {
  columns: DefaultColumn[]
  sorting: SortBy
}

export const useHeader = ({ columns }: HeaderProps): Header[] => {
  return columns.map(({ header, id }) => {
    return {
      id: id,
      text: header,
    }
  })
}
