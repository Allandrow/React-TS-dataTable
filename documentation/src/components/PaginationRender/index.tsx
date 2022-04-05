import React, { useState, useMemo } from 'react'
import { paginationWithSuspend } from 'react-ts-datatable'
import { Pagination } from './Pagination'
import { PaginationParams, PaginationRenderOptions } from './types'
import styles from './styles.module.css'

interface PaginationState extends PaginationParams {
  [key: string]: number
}

export const PaginationRender = () => {
  const [lastPage, setLastPage] = useState(10)
  const [page, setPage] = useState(1)
  const [distance, setDistance] = useState(4)
  const [threshold, setThreshold] = useState(8)
  const [sibling, setSibling] = useState(1)

  const pagination = useMemo(() => {
    return {
      firstPage: 1,
      lastPage: isFinite(lastPage) ? lastPage : 1,
      page: isFinite(page) ? page : 1,
    } as PaginationParams
  }, [lastPage, page])

  const options = useMemo(() => {
    return {
      minimumSuspendDistance: isFinite(distance) ? distance : 1,
      doNotSuspendIfBelowThreshold: isFinite(threshold) ? threshold : 1,
      siblingCount: isFinite(sibling) ? sibling : 1,
    } as PaginationRenderOptions
  }, [distance, threshold, sibling])

  const paginationRenderValues = paginationWithSuspend(pagination, options)

  return (
    <>
      <div>
        <h2>Result :</h2>
        <Pagination {...paginationRenderValues} />
      </div>
      <div className={styles.customForm}>
        <h2>Change Values</h2>
        <div>
          <label>
            <span>lastPage : </span>
            <input
              type="number"
              value={lastPage}
              onChange={(e) => setLastPage(parseInt(e.currentTarget.value, 10))}
            />
          </label>
          <label>
            <span>page :</span>
            <input
              type="number"
              value={page}
              onChange={(e) => setPage(parseInt(e.currentTarget.value, 10))}
            />
          </label>
        </div>
        <div>
          <label>
            <span>minimumSuspendDistance : </span>
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(parseInt(e.currentTarget.value, 10))}
            />
          </label>
          <label>
            <span>doNotSuspendIfBelowThreshold :</span>
            <input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(parseInt(e.currentTarget.value, 10))}
            />
          </label>
          <label>
            <span>siblingCount :</span>
            <input
              type="number"
              value={sibling}
              onChange={(e) => setSibling(parseInt(e.currentTarget.value, 10))}
            />
          </label>
        </div>
      </div>
    </>
  )
}
