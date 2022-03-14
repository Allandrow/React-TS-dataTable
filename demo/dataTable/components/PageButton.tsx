interface PageButtonProps {
  page: number
  setPage: (value: number) => void
}

export const PageButton = ({ page, setPage }: PageButtonProps) => {
  return <button onClick={() => setPage(page)}>{page}</button>
}
