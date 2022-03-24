---
sidebar_position: 2
---

# Internal logic

## States

The hook will manage four different state values, each of which you can interact with the given handler functions that are provided in the returned object. We'll briefly introduce those states here :

### sorting

The sorting state value is an object with two properties : an `id` that is the value of a column id, and a direction : a string that allows only two values : `descending` and `ascending`.

This sorting object will be modified via the handler `handleSorting` and will be used to create the headers and rows in the expected order as well as providing object properties to determine which columns / cells of the table are sorted.

```typescript
interface SortBy {
  id: string
  direction: 'ascending' | 'descending'
}
```

Default value :

```js
{
  id: columns[0].id,
  direction: 'descending',
}
```

### filter

The filter state is a string that will be used to display rows that contain a cell that includes the queried string.

Default value : `''`.

:::tip Quick Note
If you have data values that aren't displayed in the table (not matched with a column id), those values won't be used in the filtering.
:::

### page

This is a number that specifies the current page displayed in the table.

Default value : `1`.

### pageSize

This is the selected option for the quantity of rows displayed in a page.

Default value :

```js
// the first number in the pageSizeOptions array : 10 if pageSizeOptions is kept as default
pageSizeOptions[0]
```

## Sorting

To sort the rows of the table, the internal hook will firstly try to destructure the `sortMethod` property of the column object with the same id as the one in the `sorting` state object. Given this property is optional, if no `sortMethod` key is found for this column the data will be sorted by treating their values as strings. You can change this behaviour by specifying either a string that is one of the built-ins methods or by giving a callback function that will be used in the sort method.

### Built-in sorting functions

The library comes with two (other than the default comparison by string types) functions that can be used to sort your data :

- sortNumber : for comparing number types
- sortDateISO : for comparing Dates

:::caution Regarding sortDateISO
this function accepts multiples data types. You can have your data as :

- a number which needs to be a milliseconds timestamp
- an ISO Datestring
- a Date Object

:::

### Using your own callback sorting function

If you wish to use your own customised sort function, you can simply provide the reference to that function.
Example of a custom sorting function that is used in a column :

```typescript
export const customStringSort: UserSortMethod = (
  a: Data,
  b: Data,
  { id, direction }: SortBy
) => {
  const aValue = a[id] as string
  const bValue = b[id] as string
  if (direction === 'descending') {
    return aValue.localeCompare(bValue)
  }

  return bValue.localeCompare(aValue)
}
```

And how it will be used inside the hook

```typescript
if (sortMethod instanceof Function) {
  try {
    return [...data].sort((a, b) => sortMethod(a, b, sorting))
  } catch (err) {
    console.error(err)
    throw new Error('Something went wrong with the function used to sort data')
  }
}
```

## Filtering

There are two minor details to specify regarding the action of filtering your tables :

- the minimum length to start applying a filter on your table is 1.
- all values will be compared as lowerCase strings.
