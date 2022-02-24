export interface PageButtonProps {
  value: number
  changePage: (value: number) => void
}

export const PageButton = ({ value, changePage }: PageButtonProps) => {
  return <button onClick={() => changePage(value)}>{value}</button>
}
