export type Data = Record<string | number, string | number>

export interface Column {
  key: string
  header: string
  sortMethod?: string
}

type Direction = 'ascending' | 'descending'

export interface Sorting {
  key: string
  direction: Direction
}

export interface SortedColumns {
  columns: Column[]
  sorting: Sorting
}

export interface PageDependant {
  currentPage: number
  pageSize: number
}
