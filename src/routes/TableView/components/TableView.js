import React, { Component } from 'react'
import TableComponent from '../../../components/table/Table'
import { staticID } from '../../../utils/unique'

// import { Link } from 'react-router'

class TableView extends Component {

  constructor (props) {
    super(props)
    this.tableID = staticID('TableView.table')
  }

  render () {
    const config = {
      table: {
        add: (resolve, reject, newData) => {
          console.log(newData)
          resolve()
        }
      },
      header: [
        {
          title: 'ID',
          prop: '_rid'
        },
        {
          title: 'Username',
          prop: 'username',
          isEditable: false
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
          formatter: (word) => <span className='badge badge-success'>{word}</span>
        },
        {
          title: 'Edit',
          prop: 'edit',
          isEdit: true,
          onUpdate: (resolve, reject, data) => {
            setTimeout(() => resolve(data), 500)
          }
        },
        {
          title: 'Delete',
          prop: 'delete',
          isDelete: true,
          formatter: () => <div className='btn btn-danger btn-sm' data-attach-on-delete>Delete</div>,
          onDelete: (resolve, reject, data) => {
            setTimeout(() => resolve(), 500)
          }
        }
      ],
      pagination: {
        pageSize: 10,
        paginationBarSize: 5
      },
      src: {
        url: '../test/tableData.json'
      }
    }
    return (
      <TableComponent id={this.tableID} config={config} />
    )
  }
}

export default TableView
