interface RecapProps {
  originalLength: number
  currentLength: number
  indices: { first: number; last: number }
}

export const Recap = ({
  originalLength,
  currentLength,
  indices: { first, last },
}: RecapProps) => {
  return (
    <p>
      {currentLength !== originalLength
        ? `Showing ${first} to ${last} of ${currentLength} entries (filtered from ${originalLength} total entries)`
        : `Showing ${first} to ${last} of ${originalLength} entries`}
    </p>
  )
}
