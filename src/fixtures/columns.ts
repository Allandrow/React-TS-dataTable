import { Column } from '../types'
import { customStringSort } from './customSortMethod'

export const columns: Column[] = [
  { id: 'firstName', displayText: 'First Name' },
  { id: 'lastName', displayText: 'Last Name' },
  { id: 'startDate', displayText: 'Start Date', sortMethod: 'sortDateISO' },
  { id: 'department', displayText: 'Department' },
  { id: 'dateOfBirth', displayText: 'Date of Birth', sortMethod: 'sortDateISO' },
  { id: 'street', displayText: 'Street' },
  {
    id: 'city',
    displayText: 'City',
    sortMethod: customStringSort,
  },
  { id: 'state', displayText: 'State' },
  { id: 'zipCode', displayText: 'Zip Code' },
]
