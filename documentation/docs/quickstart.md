---
sidebar_position: 2
---

# Quickstart

## Installation

```sh
npm i react-ts-datatable
```

Or

```sh
yarn add react-ts-datatable
```

## Data setup

The `useTable` hook will need an array for the columns and an array for the data. Here's a setup example for both :

- Columns :

```typescript
const columns = [
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

- Data :

```typescript
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
  {
    key: 'e092e395-2637-4bbc-b7bd-a8668f53b288',
    firstName: 'Jo',
    lastName: 'Barnsley',
    department: 'Legal',
    dateOfBirth: '11/23/1982',
    startDate: '05/09/2020',
    street: '7 Warner Way',
    city: 'Fort Worth',
    state: 'TX',
    zipCode: '76147',
  },
]
```

## Hook call

Once your data is setup simply import the hook from react-ts-datatable, call it with your columns and data and destructure the returned object.

```typescript
import { useTable } from 'react-ts-datatable'

const {
  headers,
  rows,
  pagination,
  summary,
  isFiltered,
  handleSorting,
  handlePageSizing,
  handleFiltering,
  handlePageChange,
} = useTable({ columns, data })
```

## Creating the table

### Headers

You can simply iterate over each item in the `headings` array and use the `id` for the key, displayText for the text content. If you care about sorting, you can also destructure `isSorted` (boolean) and `sortingDirection` (string) the column is sorted.

```tsx
<thead>
  <tr>
    {headers.map(({ id, displayText }) => (
      <th key={id}>{displayText}</th>
    ))}
  </tr>
</thead>
```

### Rows

Iterate over your `rows` array, using its `key` for the required key and `data` to iterate over each value in the row.

For the row iteration, simply destructure the `key` and `cellValue`. If you care about sorting, you can also destructure `isSorted` (boolean) in the row.

```tsx
<tbody>
  {rows.map(({ data, key }) => (
    <tr key={key}>
      {data.map(({ cellValue, key }) => (
        <td key={key}>{cellValue}</td>
      ))}
    </tr>
  ))}
</tbody>
```

## Creating the pagination

Given the pagination bare values provided, it is recommended to use the `paginationWithSuspend` helper function to render a more complete component unless you have other pre-requisites and this example will show how to use the helper function.

```tsx
<>
  {suspendBeforeList && (
    <>
      <li key={firstPage}>
        <button onClick={() => handlePageChange(firstPage)}>{firstPage}</button>
      </li>
      <li key={'suspendedBeforeList'}>
        <span>…</span>
      </li>
    </>
  )}

  {pageList.length > 0 &&
    pageList.map((pageNumber) => (
      <li key={pageNumber}>
        <button onClick={() => handlePageChange(page)}>{page}</button>
      </li>
    ))}

  {suspendAfterList && (
    <>
      <li key={'suspendedAfterList'}>
        <span>…</span>
      </li>
      <li key={lastPage}>
        <button onClick={() => handlePageChange(lastPage)}>{lastPage}</button>
      </li>
    </>
  )}
</>
```
