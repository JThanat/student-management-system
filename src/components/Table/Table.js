import React, { Component } from 'react'
// import { Link } from 'react-router'
import './Table.scss'

class Table extends Component {

  loadTable = () => {
    this.props.loadTable(this.src, this.config)
  }

  deleteRow = (row, id) => {
    console.log(row, id)
  }

  editRow = (row, id) => {
    console.log(row, id)
  }

  changePage = (pageNo) => {
    this.props.changePage(pageNo, this.config)
  }

  changePageTab = (startPage) => {
    this.props.changePageTab(startPage)
  }

  componentWillMount () {
    const props = this.props
    const { config } = props

    config.pagination = config.pagination || {
      pageSize: config.pagination.pageSize || 10,
      paginationTabSize: config.pagination.paginationTabSize || 5
    }

    this.config = config
    this.src = {
      url: props.url
    }
  }

  render () {
    const props = this.props
    let { tableView } = props
    const config = this.config
    const { header } = config

    tableView = tableView || {}
    tableView.data = tableView.data || []

    let thead = header.map((header, i) => {
      return <th key={i}>{header.title}</th>
    })
    let tbody = tableView.data.map((rowData, i) => {
      let rowbody = header.map((header, j) => {
        if (header.isDelete) {
          let delBtn = typeof header.formatter === 'function'
            ? header.formatter()
            : (<div className='btn btn-danger btn-sm'>Delete</div>)
          delBtn = React.cloneElement(
            delBtn,
            { onClick: () => this.deleteRow(rowData, i) }
          )
          return <td key={j}>{delBtn}</td>
        } else if (header.isEdit) {
          let editBtn = typeof header.formatter === 'function'
            ? header.formatter()
            : (<div className='btn btn-warning btn-sm'>Edit</div>)
          editBtn = React.cloneElement(
            editBtn,
            { onClick: () => this.editRow(rowData, i) }
          )
          return <td key={j}>{editBtn}</td>
        } else {
          let val = rowData[header.prop]
          if (typeof header.formatter === 'function') {
            val = header.formatter(val)
          }
          return <td key={j}>{val}</td>
        }
      })
      return <tr key={i}>{rowbody}</tr>
    })

    const colSpanSize = header.length

    return (
      <div>
        <div className='btn btn-primary' onClick={this.loadTable} style={{ marginBottom: 15 }}>
          Load Table
        </div>
        {
          props.errorMsg &&
          (<div className='alert alert-danger' role='alert'>
            <strong>Oops!</strong> {props.errorMsg}
          </div>)
        }
        <table className='table table-bordered table-striped table-md'>
          <thead>
            <tr>
              {thead}
            </tr>
          </thead>
          <tbody>
            {
              props.isLoading
              ? (
                <tr><td style={{ textAlign: 'center' }} colSpan={colSpanSize}>
                  <i className='fa fa-spin fa-spinner' /> Loading...
                </td></tr>
              ) : (
                props.data.length === 0
                ? (
                  <tr><td style={{ textAlign: 'center' }} colSpan={colSpanSize}>
                    No record to show
                  </td></tr>
                )
                : tbody
              )
            }
          </tbody>
        </table>
        <nav>
          <ul className='pagination'>
            {
              tableView && (function (thiss) {
                let prev = (tableView.startPage || 1) - config.pagination.paginationTabSize
                if (prev >= 1) {
                  return (<li className='page-item' onClick={() => thiss.changePageTab(prev)}>
                    <span className='page-link'>Prev</span>
                  </li>)
                } else {
                  return null
                }
              })(this)
            }
            {
              tableView && Array(config.pagination.paginationTabSize).fill(1).map((el, i) => {
                const id = i + (tableView.startPage || 1)
                if (id <= tableView.pageAll) {
                  return (<li
                    className={'page-item ' + (id === tableView.pageNo ? 'active' : '')}
                    key={i}
                    onClick={() => this.changePage(id)}>
                    <span className='page-link'>{ id }</span>
                  </li>)
                } else {
                  return null
                }
              })
            }
            {
              tableView && (function (thiss) {
                let next = config.pagination.paginationTabSize + (tableView.startPage || 1)
                if (next <= tableView.pageAll) {
                  return (<li className='page-item' onClick={() => thiss.changePageTab(next)}>
                    <span className='page-link'>Next</span>
                  </li>)
                } else {
                  return null
                }
              })(this)
            }
          </ul>
        </nav>
      </div>
    )
  }
}

// Configuration Type
const configTypes = React.PropTypes.shape({
  header: React.PropTypes.arrayOf(React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    prop: React.PropTypes.string.isRequired,
    formatter: React.PropTypes.func,
    isDelete: React.PropTypes.bool
  })).isRequired,
  pagination: React.PropTypes.shape({
    pageSize: React.PropTypes.number.isRequired,
    paginationTabSize: React.PropTypes.number.isRequired
  })
}).isRequired

Table.propTypes = {
  loadTable: React.PropTypes.func.isRequired,
  changePage: React.PropTypes.func.isRequired,
  changePageTab: React.PropTypes.func.isRequired,
  config: configTypes,
  id: React.PropTypes.string.isRequired,
  data: React.PropTypes.array,
  isLoading: React.PropTypes.bool,
  errorMsg: React.PropTypes.string
}

export default Table
