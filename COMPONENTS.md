# List of Components, props, state and logic

## DataTable

<br>

### Description

Wrapper controlling the overall state of the module

### Props

- data
- headings

### State

- searchValue, setSearchValue
- pageSize, setPageSize
- currentPage, setCurrentPage
- displayedData, setDisplayedData
- ordering, setOrdering

### Logic

- setDisplayedData : sort data according to ordering
- setDisplayedData : Filtering data when searchValue changes
- slicedData : Slices displayedData to display only items based on currentPage and pageSize

### Children components

- PageSizeSelect (setPageSize)
- SeachInput (setSearchValue)
- Table (headings, slicedData, ordering, setOrdering)
- Recap (data.length, filteredData, pageSize, currentPage)
- Pagination (filteredData.length, pageSize, currentPage, setCurrentPage)

<br>

---

<br>

## PageSizeSelect

<br>

### Description

Select input with default options. On change, pass the new value up to the wrapper component.

### Props

- callback

<br>

---

<br>

## SearchInput

<br>

### Description

Input component to specify search value for filtering data. On change, pass the new value up to the wrapper component.

### Props

- callback

<br>

---

<br>

## Table

<br>

### Description

Component displaying headings and data in a table format. On heading click pass up new ordering value to wrapper component.

### Props

- displayedData
- headings
- ordering
- callback

<br>

---

<br>

## Recap

<br>

### Description

Text component displaying the current range of items viewed in the table out of a total. If results are filtered, also display the actual data total in parenthesis.

### Props

- data.length
- filteredData.length
- pageSize
- currentPage

### Logic

- Calculating the first/last index of results shown
- If data.length is different from filteredData.length, render a different text layout

<br>

---

<br>

## Pagination

<br>

### Description

Pagination component displaying currentPage, list of pages (in a range?) and buttons to change currentPage. on click of those buttons, pass up new currentPage value.

### Props

- filteredData.length
- pageSize
- currentPage
- setCurrentPage

### Logic

- Calculating range of buttons to switch currentPage
