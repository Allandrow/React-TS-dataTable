---
sidebar_position: 1
---

# Basic

When calling the `useTable` hook, you'll need to provide an object as argument. This object will contain 3 properties (1 is optional with default values) :

```typescript
import { useTable } from 'react-ts-datatable'

const instance = useTable({ columns, data, pageSizingOptions })
```

## Columns, Data and PageSizingOptions

To properly build the table, the arrays you'll provide will need to respect a specific structure as described below :

### Columns

The columns array represent the information regarding each column of your table. Each item in the array will be an object (the column information) and will need to contain these properties :

```typescript
interface Column {
  id: string
  displayText: string
  sortMethod?: string | Function
}
```

**id** : the identifier for the column. This is the value that is used to match a value in your data rows to a specific column.

**displayText** : the text that will be displayed in the headers of the table

**sortMethod** _(optional)_ : by default your column values will be compared as if they are strings. If this behaviour isn't what you intend for this column you can alter it by :

- providing a new string value that is one of the built-in sort methods included in the hook (more info on internal-logic/sorting page)
- providing your own callback function that will be applied to the sort method of this column.

#### Example

```js
const columns: Column[] = [
  { id: 'firstName', displayText: 'First Name' },
  { id: 'lastName', displayText: 'Last Name' },
  { id: 'startDate', displayText: 'Start Date', sortMethod: 'sortDateISO' },
  { id: 'department', displayText: 'Department' },
  { id: 'dateOfBirth', displayText: 'Date of Birth', sortMethod: 'sortDateISO' },
  { id: 'street', displayText: 'Street' },
  { id: 'city', displayText: 'City', sortMethod: customStringSort },
  { id: 'state', displayText: 'State' },
  { id: 'zipCode', displayText: 'Zip Code' },
]
```

### Data

The data array represents your raw data values. Each item in your data will be an object(a row in the table) and will need to respect this structe :

```typscript
  type DataProps = Record<string, unknown>

  interface Data extends DataProps {
    key: string
  }
```

Here, the `key` property will be used for the key value of React Lists. For the other properties, if you want it to be displayed in the table you'll need to have a key that matches the id of a column, otherwise the value will not be picked up by the table.

:::caution
Be aware that in its current form this library doesn't handle nested values. Using data types other than primitives may end up causing issues.
:::

#### Example

This is an example of an object inside the data array that is used in the demo example

```js
const data = [
  {
    key: '0224353f-726b-497f-9e46-97dfd516d673',
    firstName: 'Bernie',
    lastName: 'Swindin',
    department: 'Services',
    dateOfBirth: '03/10/1988',
    startDate: '08/18/2018',
    street: '6 Schiller Drive',
    city: 'Memphis',
    state: 'TN',
    zipCode: '38143',
  },
  // …
]
```

Here you can notice that the only property that doesn't match a column id is the **key** property, thus it won't appear in the table and won't be used as a filterable value either.

### PageSizingOptions

Optional array that allows you to specify the list of options for the number of rows displayed in a page.
By default the values are `[10, 20, 50, 100]`

## Instance object

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
```

### Headers

An array of objects. Each item of the array, a header will have this structure :

```typescript
interface Header {
  id: string
  displayText: string
  isSorted?: boolean
  sortingDirection?: 'ascending' | 'descending'
}
```

Built from the `columns` array given as input, it will return a new array providing ids and texts from the original columns with added information regarding sorting.

**id** : string given as `id` from the column and will be used to match rows values.

**displayText** : string given as `displayText` from a column and will be used to display the name of the column.

**isSorted** (_optional_) : boolean appearing only in sorted columns.

**sortingDirection** (_optional_) : string with two possibles values that describes the direction of the sort. Appears only in sorted columns.

### Rows

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

Each item in this array will be one of the values that has a key matched in columns. The order of items corresponds to the order of the columns.

**key** : A constructed string that concatenates the id of the column + the value of the cell to create an identifier for React list keys.

**cellValue** : the value displayed in the table.

**isSorted** : a boolean value to specify if the cell is part of a sorted column or not.

### Pagination

If no data is provided to the `useTable` hook or if after filtering no data remains to be displayed, the value will be `null`.

Otherwise, it will be an object with the given properties :

```typescript
interface PaginationParams {
  firstPage: number
  lastPage: number
  page: number
}
```

**firstPage** (_default_ : `1`) : Value of the first page. Given for consistency purposes.

**lastPage** : Number of the last page, depending of the values of `pageSizing` and the length of the data after filtering.

**page** : Current page number.

### Summary

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

**originalLength** : the length of the data given to the `useTable` hook.

**filteredLength** : the length of the data displayed in the table, all pages included.

**isFiltered** : a boolean to specify if the results displayed in the table are filtered.

**firstIndex** : the table index of the first element in the current page.

**lastIndex** : the table index of the last element in the current page.

:::tip About Indices
If there is no data or no filtered data to be displayed, both `firstIndex` and `lastIndex` will have a value of 0.
:::

### isFiltered

A simple boolean stating if the table is affected by a filter value.

:::info Filter length trigger
The way the internal logic is setup, the filter will start being applied right from the first character.
:::

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

## Demo

You can find more details on the way theses values are setup and used in the Github repository within the [demo folder](https://github.com/Allandrow/React-TS-dataTable/tree/main/demo/dataTable).
