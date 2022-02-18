import { Headings } from './fixtures/headings'

export interface Ordering {
  key: string
  order: 'ascending' | 'descending'
}

export interface HeadingRelatedValue {
  [key: string]: string
}

export interface OrderedHeadings {
  headings: Headings
  ordering: Ordering
}

export interface PageDependant {
  currentPage: number
  pageSize: number
}
