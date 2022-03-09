interface PageButtonProps {
  page: number
  setCurrentPage: (value: number) => void
}

export const PageButton = ({ page, setCurrentPage }: PageButtonProps) => {
  return <button onClick={() => setCurrentPage(page)}>{page}</button>
}
