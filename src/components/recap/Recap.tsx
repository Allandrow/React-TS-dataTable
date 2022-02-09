import { useRecapText } from '../../hooks/useRecapText'
import { TextRecap } from '../../types'

export const Recap = ({
  dataLength,
  filteredDataLength,
  pageSize = 10,
  currentPage = 1,
}: TextRecap) => {
  const recapText = useRecapText({
    dataLength,
    filteredDataLength,
    pageSize,
    currentPage,
  })

  return <p>{recapText}</p>
}
