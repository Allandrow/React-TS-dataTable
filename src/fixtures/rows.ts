import { Row } from '../types'

export const rows: Row[] = [
  {
    key: '0',
    data: [
      {
        key: '00-test',
        cellValue: 'matching result',
        isSorted: true,
      },
      {
        key: `01-test`,
        cellValue: `not matching but in same row`,
        isSorted: false,
      },
    ],
  },
  {
    key: '1',
    data: [
      {
        key: '10-test',
        cellValue: 'no match',
        isSorted: true,
      },
      {
        key: `11-test`,
        cellValue: `no match either`,
        isSorted: false,
      },
    ],
  },
]
