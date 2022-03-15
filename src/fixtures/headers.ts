import { Header } from '../hooks/useHeader/useHeader'

export const headers: Header[] = [
  {
    id: 'firstName',
    text: 'First Name',
    isSorted: true,
    sortingDirection: 'descending',
  },
  { id: 'lastName', text: 'Last Name', isSorted: false, sortingDirection: 'descending' },
  {
    id: 'startDate',
    text: 'Start Date',
    isSorted: false,
    sortingDirection: 'descending',
  },
  {
    id: 'department',
    text: 'Department',
    isSorted: false,
    sortingDirection: 'descending',
  },
  {
    id: 'dateOfBirth',
    text: 'Date of Birth',
    isSorted: false,
    sortingDirection: 'descending',
  },
  { id: 'street', text: 'Street', isSorted: false, sortingDirection: 'descending' },
  { id: 'city', text: 'City', isSorted: false, sortingDirection: 'descending' },
  { id: 'state', text: 'State', isSorted: false, sortingDirection: 'descending' },
  { id: 'zipCode', text: 'Zip Code', isSorted: false, sortingDirection: 'descending' },
]
