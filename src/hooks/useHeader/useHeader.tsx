import { DefaultColumn, Header, OptionsList } from '../useTable/useTable'

interface HeaderProps {
  columns: DefaultColumn[]
  features: Partial<OptionsList>
}

export const useHeader = ({ columns, features }: HeaderProps): Header[] => {
  return columns.map(({ header, id }) => {
    const { sortBy } = features
    return {
      id: id,
      text: header,
      classNames: sortBy?.id === id ? ['sorted', sortBy.direction] : [],
    }
  })
}
