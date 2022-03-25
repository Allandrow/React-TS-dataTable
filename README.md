# React-TS-dataTable

A simple headless library to create tables amd components that interact with them.

Built With :

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)

## Installation

- Install the package in your repo

```shell
  npm i react-ts-datatable
```



- rows : An array containing each row as an object. Each row will be an object with two properties :

  - key obtained from data
  - data : the array containing each cell value in the row. Earch cell will have a key built from the id of the column + the value of the cell, the value in itself and a boolean stating if this cell is part of a sorted column or not.

- pagination : An object with information regarding current page :

  - firstPage,
  - lastPage,
  - page (currently displayed page)

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
