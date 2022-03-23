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
    displayText: string
    sortMethod?: string
  }
  ```

  Example of columns used in the demo :

  ```js
  const columns = [
    { id: 'firstName', displayText: 'First Name' },
    { id: 'lastName', displayText: 'Last Name' },
    { id: 'startDate', displayText: 'Start Date', sortMethod: 'sortDateISO' },
    { id: 'department', displayText: 'Department' },
    { id: 'dateOfBirth', displayText: 'Date of Birth', sortMethod: 'sortDateISO' },
    { id: 'street', displayText: 'Street' },
    { id: 'city', displayText: 'City' },
    { id: 'state', displayText: 'State' },
    { id: 'zipCode', displayText: 'Zip Code' },
  ]
  ```

  - id: string value that will be used to link a column with values in each of the data table objects
  - displayText : string value that will be the displayed text for the column
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
        displayText: 'First Name',
        isSorted: true,
        sortingDirection: 'descending',
      },
      {
        id: 'lastName',
        displayText: 'Last Name',
        isSorted: false,
        sortingDirection: 'descending',
      },
      {
        id: 'startDate',
        displayText: 'Start Date',
        isSorted: false,
        sortingDirection: 'descending',
      },
      {
        id: 'department',
        displayText: 'Department',
        isSorted: false,
        sortingDirection: 'descending',
      },
      {
        id: 'dateOfBirth',
        displayText: 'Date of Birth',
        isSorted: false,
        sortingDirection: 'descending',
      },
      {
        id: 'street',
        displayText: 'Street',
        isSorted: false,
        sortingDirection: 'descending',
      },
      {
        id: 'city',
        displayText: 'City',
        isSorted: false,
        sortingDirection: 'descending',
      },
      {
        id: 'state',
        displayText: 'State',
        isSorted: false,
        sortingDirection: 'descending',
      },
      {
        id: 'zipCode',
        displayText: 'Zip Code',
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

This helper function allows you to obtain values regarding the setup of a pagination with ellipsis, or suspends, between pages.
Providing the pagination object you get from the `useTable` hook it will return a new object with a list of pages, the state of suspension before/after the list and the previous pagination properties.

Example call of function :

```js
const customPagination = paginationWithSuspend(pagination, options?)
```

Coming out of the box with default, you can also override them with your preferred setups. Included properties and their default values are :

- suspendCountThreshold: if the current page is within the first or last X pages it will display X pages before/after the suspend, X being the property value. Default value : 4

- displayedPagesUntilSuspend : if the total number of pages is equal or below this value, the pagination will display all the pages without suspension. Default value : 7

- siblingCount : number of pages to display around the current page. Default value : 1

To override a default value, you can provide an object with the property/properties you want to modify as the options argument

example :

```js
const customPagination = paginationWithSuspend(pagination, {
  displayedPagesUntilSuspend: 5,
  siblingCount: 3,
})
```

This way, suspendCountThreshold will stay at its default value and the two other properties will take the new values instead of the default.

##### helper return

Details of the properties in the returned object :

- pageList : array of pages
- suspendAfterList: boolean
- suspendBeforeList: boolean
- all the properties from the pagination object
