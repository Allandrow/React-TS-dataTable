# React - TypeScript Data Tables

A simple headless library to create tables and components that interacts with them.

Built With :

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)

# How to Use

- Install the package in your repo `npm i react-ts-datatable`

The library currently exposes one hook `useTable` and one helper function `paginationWithSuspend` that is specific to help you build a pagination component.

First off let's look at the hook, what arguments are needed and what it returns.

## useTable

This custom hook will take an object with 3 properties as argument, which are :

```typescript
columns: DefaultColumn[]
data: Data[]
pageSizeOptions?: number[]
```

We'll shortly go over what DefaultColumn and Data interfaces contain, right now we know that columns is an array of objects, so is data and pageSizeOptions is an optional array of numbers.

Let's go over every one of those properties to check the specifics.

### 1. columns

This array contains the specifications regarding the construction of table columns and its headers. For each item in the array there will be an id (that will be used to link a column with the items in the data array), a header string value that will be the displayed name of said column, and finally an optionnal string `sortMethod` that will be used to specify a specific built-in sort method that can be applied to this column.

First an example of a columns array that is used in the demo that you can find in the repo, with its TS definition :

```typescript
interface DefaultColumn {
  id: string
  header: string
  sortMethod?: string
}

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

Currently only three distinct sort methods exist that we'll check more in depth later, here we'll juste list the options :

- sortDateISO
- sortNumber
- sortString (default)

### 2. data

the data array contains objects for each row. Its content is a bit more straightforward with only two specifics points :

- each object in the array must contain a `key` property, which will be used as key identifier for the row when you'll iterate over the array you'll receive from the hook
- this library doesn't handle nested data so in order to avoid unintended behaviours I suggest you only use primitive data types as values.

Again a simple example of a data array extracted from the demo data :

```typescript
type DataProps = Record<string, unknown>

interface Data extends DataProps {
  key: string
}

const data: Data[] = [
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
    zipCode: 78715,
  },
  {
    key: '2',
    firstName: 'Amalie',
    lastName: 'Nanetti',
    dateOfBirth: '09/14/1994',
    startDate: '03/31/2017',
    street: '4727 Mosinee Plaza',
    department: 'Business',
    city: 'Saint Petersburg',
    state: 'FL',
    zipCode: 33715,
  },
]
```
