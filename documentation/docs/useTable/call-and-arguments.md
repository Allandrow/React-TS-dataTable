---
sidebar_position: 1
---

# Call and Arguments

When calling the `useTable` hook, you'll need to provide an object as argument. This object will contain 3 properties (1 is optional with default values) :

```typescript
import { useTable } from 'react-ts-datatable'

const instance = useTable({ columns, data, pageSizingOptions })
```

## Properties details

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

## Demo

You can find more details on the way theses values are setup and used in the Github repository within the [demo folder](https://github.com/Allandrow/React-TS-dataTable/tree/main/demo).
