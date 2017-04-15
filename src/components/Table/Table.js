import React, { Component } from 'react'
// import { Link } from 'react-router'
import './Table.scss'

class Table extends Component {

  loadTable = () => {
    this.props.loadTable(this.src)
  }

  deleteRow = (row, id) => {
    console.log(row, id)
  }

  editRow = (row, id) => {
    console.log(row, id)
  }

  componentWillMount () {
    const props = this.props
    const { config } = props
    this.header = config.header
    this.src = {
      url: props.url
    }
  }

  render () {
    const props = this.props
    const { data } = props

    let thead = this.header.map((header, i) => {
      return <th key={i}>{header.title}</th>
    })
    let tbody = data.map((rowData, i) => {
      let rowbody = this.header.map((header, j) => {
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

    const colSpanSize = this.header.length

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
            <li className='page-item'><a className='page-link' href='#'>Prev</a></li>
            <li className='page-item active'>
              <a className='page-link' href='#'>1</a>
            </li>
            <li className='page-item'><a className='page-link' href='#'>2</a></li>
            <li className='page-item'><a className='page-link' href='#'>3</a></li>
            <li className='page-item'><a className='page-link' href='#'>4</a></li>
            <li className='page-item'><a className='page-link' href='#'>Next</a></li>
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
  src: React.PropTypes.shape({
    url: React.PropTypes.string.isRequired
  })
}).isRequired

Table.propTypes = {
  loadTable: React.PropTypes.func.isRequired,
  config: configTypes,
  id: React.PropTypes.string.isRequired,
  data: React.PropTypes.array,
  isLoading: React.PropTypes.bool,
  errorMsg: React.PropTypes.string
}

export default Table
