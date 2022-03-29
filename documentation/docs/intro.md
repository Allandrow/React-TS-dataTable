---
sidebar_position: 1
---

# Introduction

React-TS-dataTable is a simple headless library that allows you to create and interact with tables. In its current form it gives you access to two functions:

- one **custom hook** `useTable` that will create an instance of a table and its interactible values/handlers
- one **helper function** `paginationWithSuspend` that offers you more properties to customize your pagination components, coming in with overridable defaults.

Built with TypeScript, it will provide you clear type definitions for your inputs and the different properties returned by the functions.

## Getting Started

### Installation

Via npm :

```shell
npm install react-ts-datatable
```

Or Yarn :

```shell
yarn add react-ts-datatable
```

## Usage

Here we'll briefly demonstrate how to use the different functions available, for more details consult the specific page for each function.

### useTable

To create a new table instance, simply call the custom hook while giving it an object containing at least the two required arrays : `columns` and `data`, `pageSizingOptions` being optional and having a default value.

```typescript
import { useTable } from 'react-ts-datatable'

const instance = useTable({ columns, data, pageSizingOptions })
```

### paginationWithSuspend

This helper function will setup a new object with information regarding the pages to display, if you need suspension in the pagination and, if so, if the suspension happens before/after your page list.

To call the function you'll need to provide the pagination object that you will receive from the `useTable` hook, or provide an object that shares the same structure. You can also provide a second object as argument that will allow you to override the default values.

```typescript
import { paginationWithSuspend } from 'react-ts-datatable'

const paginationRenderValues = paginationWithSuspend(pagination, userOptions)
```
