import React from 'react'
import TableComponent from '../../../components/Table'
import unique from '../../../utils/unique'

export const Table = (props) => {
  const config = {
    header: [
      {
        title: 'Username',
        prop: 'username'
      },
      {
        title: 'Date registered',
        prop: 'date'
      },
      {
        title: 'Role',
        prop: 'role'
      },
      {
        title: 'Status',
        prop: 'status',
        formatter: (word) => { return word }
      }
    ]
  }
  return (
    <TableComponent id={unique('table')} config={config} />
  )
}

export default Table
