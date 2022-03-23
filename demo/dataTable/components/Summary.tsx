interface SummaryProps {
  originalLength: number
  filteredLength: number
  isFiltered: boolean
  firstIndex: number
  lastIndex: number
}

export const Summary = ({
  originalLength,
  filteredLength,
  isFiltered,
  firstIndex,
  lastIndex,
}: SummaryProps) => {
  return (
    <p>
      {isFiltered && originalLength !== filteredLength
        ? `Showing ${firstIndex} to ${lastIndex} of ${filteredLength} entries (filtered from ${originalLength} total entries)`
        : `Showing ${firstIndex} to ${lastIndex} of ${originalLength} entries`}
    </p>
  )
}
