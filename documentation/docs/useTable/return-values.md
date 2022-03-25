---
sidebar_position: 3
---

# Returned Properties

The `useTable` hook will return a single object containing multiple properties :

```typescript
interface UseTableValues {
  headers: Header[]
  rows: Row[]
  pagination: PaginationParams | null
  summary: SummaryValues
  isFiltered: boolean
  handleSorting: HandleSorting
  handleFiltering: HandleFiltering
  handlePageSizing: HandlePageSizing
  handlePageChange: HandlePageChange
}

return {
  headers,
  rows,
  pagination,
  summary,
  isFiltered,
  handleSorting,
  handleFiltering,
  handlePageSizing,
  handlePageChange,
} as UseTableValues
```

## headers

An array of objects. Each item of the array, a header will have this structure :

```typescript
interface Header {
  id: string
  displayText: string
  isSorted?: boolean
  sortingDirection?: 'ascending' | 'descending'
}
```

Basically, given a columns array, it will return an array with at least the same props except for the column that is sorted, this one will have two added properties regarding the sorting of the table. These properties are exclusive to the sorted column.

## rows

An array of objects representing your data with rows ordered in a way that is matched with the order of your columns, and thus, the headers.

```typescript
interface Cell {
  key: string
  cellValue: unknown
  isSorted: boolean
}

interface Row {
  key: string
  data: Cell[]
}
```

- The `key` in the `Row` type is the `key` that was provided for each item in your data array.

### cell

Each item in this array will be one of the values that has a key matched in columns. The order of items corresponds to the order of the columns.

- key: A constructed string that concatenates the id of the column + the value of the cell to create an identifier for React list keys.
- cellValue : the value displayed in the table.
- isSorted : a boolean value to specify if the cell is part of a sorted column or not.

## pagination

If no data is provided to the `useTable` hook or if after filtering no data remains to be displayed, the value will be `null`.

Otherwise, it will be an object with the given properties :

```typescript
interface PaginationParams {
  firstPage: number
  lastPage: number
  page: number
}
```

- `firsPage` value will be defaulted to `1` and given for the sake of consistency.
- `lastPage` value represent the number of pages depending of the pageSizing and the length of the data array after filtering.
- `page` value is the number of the currently displayed page.

## summary

The `summary` object contains properties that provides information regarding the number of items in the table (given and displayed) and the indices of items in the current page.

```typescript
interface SummaryValues {
  originalLength: number
  filteredLength: number
  isFiltered: boolean
  firstIndex: number
  lastIndex: number
}
```

- `originalLength` : the length of the data given to the `useTable` hook.
- `filteredLength` : the length of the data displayed in the table, all pages included.
- `isFiltered` : a boolean to specify if the results displayed in the table are filtered.
- `firstIndex` : the table index of the first element in the current page.
- `lastIndex` : the table index of the last element in the current page.

:::tip About Indices
If there is no data or no filtered data to be displayed, both `firstIndex` and `lastIndex` will have a value of 0.
:::

## isFiltered

A simple boolean stating if the filter has a positive length.

## Handlers

The hook provides four different function handlers that allows you to alter the state of the table.

Except for `handlePageChange`, the rest of them accepts an additional options argument that allows you to specify if a given state modification also resets the page to the first one or not.

By default, the reset will be active. If you wish to modify this, you'll need to provide an object as second argument to the handler and assign a false value to the `resetPage` key.

### handleSorting

This handler allows you to specify a new sorting id/direction.

By default any modification via this handler will also reset the pagination to the first page, as specified above.

```typescript
interface StateChangeOptions {
  resetPage: boolean
}

interface SortBy {
  id: string
  direction: 'ascending' | 'descending'
}

type HandleSorting = (sorting: SortBy, options?: StateChangeOptions) => void
```

### handleFiltering

This handler allows you to specify a filter value to filter the table.

By default any modification via this handler will also reset the pagination to the first page, as specified above.

```typescript
interface StateChangeOptions {
  resetPage: boolean
}

type HandleFiltering = (value: string, options?: StateChangeOptions) => void
```

### handlePageSizing

This handler allows you to specify the number of rows to display in a page.

By default any modification via this handler will also reset the pagination to the first page, as specified above.

```typescript
interface StateChangeOptions {
  resetPage: boolean
}

type HandlePageSizing = (value: number, options?: StateChangeOptions) => void
```

### handlePageChange

This handler allows you to specify the page that will be displayed in the table.

Given that it already interacts with the pagination, there is no option to handle the page resetting here !

```typescript
type HandlePageChange = (value: number) => void
```
