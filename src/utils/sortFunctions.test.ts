import { sortFunctions } from './sortFunctions'
import { data } from '../fixtures/data'

describe('sort functions', () => {
  test('sort string', () => {
    let sortedData = data.sort((a, b) =>
      sortFunctions.get('sortString')(a, b, { id: 'lastName', direction: 'descending' })
    )

    expect(sortedData[0].lastName).toBe('Maciaszek')
    expect(sortedData[2].lastName).toBe("O'Connolly")

    sortedData = data.sort((a, b) =>
      sortFunctions.get('sortString')(a, b, { id: 'city', direction: 'ascending' })
    )

    expect(sortedData[0].city).toBe('Saint Petersburg')
    expect(sortedData[2].city).toBe('Austin')
  })

  test('sort number', () => {
    const dataNumbers = [
      { number: 2 },
      { number: 49 },
      { number: 258 },
      { number: 1 },
      { number: -10 },
      { number: 0 },
    ]

    let sortedData = dataNumbers.sort((a, b) =>
      sortFunctions.get('sortNumber')(a, b, { id: 'number', direction: 'descending' })
    )

    expect(sortedData[0].number).toBe(-10)
    expect(sortedData[1].number).toBe(0)
    expect(sortedData[5].number).toBe(258)

    sortedData = dataNumbers.sort((a, b) =>
      sortFunctions.get('sortNumber')(a, b, { id: 'number', direction: 'ascending' })
    )

    expect(sortedData[0].number).toBe(258)
    expect(sortedData[1].number).toBe(49)
    expect(sortedData[5].number).toBe(-10)
  })

  test('sort date with ISO dateString', () => {
    let sortedData = [...data].sort((a, b) =>
      sortFunctions.get('sortDateISO')(a, b, {
        id: 'dateOfBirth',
        direction: 'descending',
      })
    )

    expect(sortedData[0].dateOfBirth).toBe('06/13/1961')
    expect(sortedData[2].dateOfBirth).toBe('09/14/1994')

    sortedData = [...data].sort((a, b) =>
      sortFunctions.get('sortDateISO')(a, b, {
        id: 'dateOfBirth',
        direction: 'ascending',
      })
    )

    expect(sortedData[0].dateOfBirth).toBe('09/14/1994')
    expect(sortedData[2].dateOfBirth).toBe('06/13/1961')
  })

  test('sort date with Date Object', () => {
    const dates = [
      {
        date: new Date('09/14/1994'),
      },
      {
        date: new Date('04/20/2017'),
      },
      {
        date: new Date('06/13/1961'),
      },
    ]

    const sortedDates = [...dates].sort((a, b) =>
      sortFunctions.get('sortDateISO')(a, b, { id: 'date', direction: 'descending' })
    )

    // new Date('06/13/1961') time
    expect(sortedDates[0].date.getTime()).toBe(-269_917_200_000)
    // new Date('04/20/2017') time
    expect(sortedDates[2].date.getTime()).toBe(1_492_639_200_000)
  })

  test('sort date with timestamp number', () => {
    const dates = [
      { date: 779_493_600_000 }, // 09/14/1994
      { date: 1_492_639_200_000 }, // 04/20/2017
      { date: -269_917_200_000 }, // 06/13/1961
    ]

    const sortedDates = [...dates].sort((a, b) =>
      sortFunctions.get('sortDateISO')(a, b, { id: 'date', direction: 'descending' })
    )

    expect(sortedDates[0].date).toBe(-269_917_200_000)
    expect(sortedDates[2].date).toBe(1_492_639_200_000)
  })

  test('method throws', () => {
    const invalidData = [
      {
        number: 1,
        willThrow: true,
        string: 'Hey',
      },
      {
        number: 2,
        willThrow: true,
        string: 'No luck',
      },
    ]

    expect(() =>
      sortFunctions.get('sortString')(invalidData[0], invalidData[1], {
        id: 'number',
        direction: 'descending',
      })
    ).toThrowError(/string/i)

    expect(() =>
      sortFunctions.get('sortNumber')(invalidData[0], invalidData[1], {
        id: 'string',
        direction: 'descending',
      })
    ).toThrowError(/number/i)

    expect(() =>
      sortFunctions.get('sortDateISO')(invalidData[0], invalidData[1], {
        id: 'willThrow',
        direction: 'descending',
      })
    ).toThrowError(/date/i)
  })
})
