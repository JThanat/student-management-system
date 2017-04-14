import React, { Component } from 'react'
import TableComponent from '../../../components/Table'
import { staticID } from '../../../utils/unique'

// import { Link } from 'react-router'

class TableView extends Component {

  constructor (props) {
    super(props)
    this.tableID = staticID('TableView.table')
    console.log(this.tableID)
  }

  render () {
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
      <TableComponent id={this.tableID} config={config} />
    )
  }
}

export default TableView
