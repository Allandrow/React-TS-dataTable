# React-TS-dataTable

A simple headless library to create tables amd components that interact with them.

Built With :

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
   1. [useTable](#usetable)
      - [columns](#columns)
      - [data](#data)
   2. [helpers](#helpers)
      - [paginationWithSuspend](#paginationwithsuspend)

## Installation

- Install the package in your repo

```shell
  npm i react-ts-datatable
```

## Usage

The library offers two distinct functions :

- `useTable` : a custom hook used to create a table instance given the data that is given as arguments
- `paginationWithSuspend` : a helper function to get some properties to build a pagination component

### useTable

This custom hook will return an instance object that will contain the different properties to display the table built from data given as inputs and interact with them.
To properly build the table the inputs need to respect a specific format.

Call example :

```typescript
interface TableHookProps {
  columns: DefaultColumn[]
  data: Data[]
  pageSizeOptions?: number[]
}

const instance = useTable({ columns, data, pageSizeOptions }: TableHookProps)
```

- Inputs (With TS definitions)

  #### - columns :

  ```typescript
  interface DefaultColumn {
    id: string
    header: string
    sortMethod?: string
  }
  ```

  Example of columns used in the demo :

  ```js
  const columns = [
    { id: 'firstName', header: 'First Name' },
    { id: 'lastName', header: 'Last Name' },
    { id: 'startDate', header: 'Start Date', sortMethod: 'sortDateISO' },
    { id: 'department', header: 'Department' },
    { id: 'dateOfBirth', header: 'Date of Birth', sortMethod: 'sortDateISO' },
    { id: 'street', header: 'Street' },
    { id: 'city', header: 'City' },
    { id: 'state', header: 'State' },
    { id: 'zipCode', header: 'Zip Code' },
  ]
  ```

  - id: string value that will be used to link a column with values in each of the data table objects
  - header : string value that will be the displayed text for the column
  - sortMethod (optional) : used to determine a specific sort method to apply to this column. If no property is specified, the data in this column will be treated as strings and the sorting handler will handle them as such. There is three available values for this property :
    - `sortString` (default)
    - `sortNumber`
    - `sortDateISO` : accepts numbers (milliseconds timestamps), ISO dateStrings and date Objects

  #### - data :

  ```typscript
    type DataProps = Record<string, unknown>

    interface Data extends DataProps {
      key: string
    }
  ```

  Example of an object in the data array :

  ```js
    {
      key: '1',
      firstName: 'Alayne',
      lastName: "O'Connolly",
      dateOfBirth: '06/13/1961',
      startDate: '08/24/2016',
      street: '23554 Maple Parkway',
      department: 'Engineering',
      city: 'Austin',
      state: 'TX',
      zipCode: '78715',
    },
  ```

  - key : property used for react lists to identify each row in the table.
  - Some details regarding the other properties, each property that you want to display in the table will need to have its key identical to one of the id given in columns, if no match is found between the two the value won't appear in the table.

  - pageSizeOptions (optional): an array of numbers. Default values are [10, 20, 50, 100]

  #### hook return

  The hook will return an object containing :

  - headers : An array containing the values from columns + indication to which column is sorted and its direction (ascending/descending)

    example from demo :

    ```typescript
    const headers: Header[] = [
      {
        id: 'firstName',
        text: 'First Name',
        isSorted: true,
        sortingDirection: 'descending',
      },
      {
        id: 'lastName',
        text: 'Last Name',
        isSorted: false,
        sortingDirection: 'descending',
      },
      {
        id: 'startDate',
        text: 'Start Date',
        isSorted: false,
        sortingDirection: 'descending',
      },
      {
        id: 'department',
        text: 'Department',
        isSorted: false,
        sortingDirection: 'descending',
      },
      {
        id: 'dateOfBirth',
        text: 'Date of Birth',
        isSorted: false,
        sortingDirection: 'descending',
      },
      { id: 'street', text: 'Street', isSorted: false, sortingDirection: 'descending' },
      { id: 'city', text: 'City', isSorted: false, sortingDirection: 'descending' },
      { id: 'state', text: 'State', isSorted: false, sortingDirection: 'descending' },
      {
        id: 'zipCode',
        text: 'Zip Code',
        isSorted: false,
        sortingDirection: 'descending',
      },
    ]
    ```

  - rows : An array containing each row as an object. Each row will be an object with two properties :

    - key obtained from data
    - data : the array containing each cell value in the row. Earch cell will have a key built from the id of the column + the value of the cell, the value in itself and a boolean stating if this cell is part of a sorted column or not.

  - pagination : An object with information regarding current page :

    - firstPage,
    - lastPage,
    - page (currently displayed page)
    - setPage (handler)

  - summary : An object with information regarding current state of displayed informations :

    - originalLength : Original number of items given to the `useTable` custom hook
    - filteredLength : length of currently displayed items
    - isFiltered : boolean
    - firstIndex : index of the first item in current page
    - lastIndex : index of the last item in current page

  - handler functions that allows you to determine how to modify states :

    - handleSorting : modifies the column that is sorted and/or the direction it is sorted. Needs an object as argument with an id (a column key) and a direction (ascending/descending)
    - handleFiltering : modifies the filter value with a string.
    - handlePageSizing : modifies the selected option to determine the number of items per page.

    By default each of these handlers will rester the current page to the first if its value is modified. You can alter this behaviour by adding an object as second argument with the `resetPage` key as false

### helpers

#### paginationWithSuspend

##### options

##### helper return
