interface PageButtonProps {
  page: number
  handlePageChange: (value: number) => void
}

export const PageButton = ({ page, handlePageChange }: PageButtonProps) => {
  return <button onClick={() => handlePageChange(page)}>{page}</button>
}
