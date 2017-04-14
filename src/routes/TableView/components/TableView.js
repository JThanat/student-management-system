import React from 'react'
import TableComponent from '../../../components/Table'
import unique from '../../../utils/unique'

export const Table = (props) => {
  const header = [
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
      prop: 'status'
    }
  ]
  return (
    <TableComponent id={unique('table')} header={header} />
  )
}

export default Table
