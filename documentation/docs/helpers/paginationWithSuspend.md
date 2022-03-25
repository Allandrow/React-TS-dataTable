---
sidebar_position: 1
---

# paginationWithSuspend

This helper function allows you to setup new values derived from the `pagination` object received from the `useTable` hook. It will define, either via its default values or the ones you assign, the list of pages to display and if suspensions need to happen before/after the current page.

## Arguments

```typescript
interface PaginationParams {
  firstPage: number
  lastPage: number
  page: number
}

interface PaginationRenderOptions {
  minimumSuspendDistance: number
  doNotSuspendIfBelowThreshold: number
  siblingCount: number
}

const paginationRenderValues = paginationWithSuspend(
  pagination: PaginationParams,
  userOptions?: Partial<PaginationRenderOptions>
)
```

- `pagination` : the object received from `useTable`
- `userOptions` : an optional object containing any or all of the properties inside the `PaginationRenderOptions` interface.

### PaginationRenderOptions

- `minimumSuspendDistance` (_default : _ `4`) : the number of pages to display from the first / last if the current page is within the distance.

:::tip siblingCount usage
If page is within the distance from the first/last, it will display the distance + siblingCount pages before / after suspension.
:::

- `doNotSuspendIfBelowThreshold` (_default : _ `8`) : If the total of pages is below this value, all pages will be displayed and no suspension will happen.

- `siblingCount` (_default : _ `1`) : the number of pages to display around the current page or after/before the minimum distance if current page is near the start/end.

## Returned Values

A single object that will contain the `pagination` object and new properties. It gives back all the properties of `pagination` to centralize all the information needed to render the pagination instead of forcing you to use different objects for the same intent.

```typescript
interface PaginationParams {
  firstPage: number
  lastPage: number
  page: number
}

interface PaginationRenderValues extends PaginationParams {
  pageList: number[]
  suspendAfterList: boolean
  suspendBeforeList: boolean
}
```

Given that the properties of `pagination` are described elsewhere, we will concentrate only on the new properties :

- `pageList` : the array of pages to be displayed.
- `suspendAfterList` : boolean stating if the pagination needs a suspension after the list
- `suspendBeforeList` : boolean stating if the pagination needs a suspension before the list
