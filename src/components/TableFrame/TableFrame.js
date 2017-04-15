import React, { Component } from 'react'
import './TableFrame.scss'

class TableFrame extends Component {

  render () {
    const props = this.props
    let { header, data } = props

    if (!(header instanceof Array)) throw new Error('Header is incorrect')
    data = data || []

    let thead = header.map((header, i) => {
      return <th key={i}>{header.title}</th>
    })
    let tbody = data.map((rowData, i) => {
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
      <table className={this.props.className}>
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
              data.length === 0
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
    )
  }
}

TableFrame.propTypes = {
  className: React.PropTypes.string.isRequired,
  data: React.PropTypes.array.isRequired,
  header: React.PropTypes.array.isRequired,
  isLoading: React.PropTypes.bool.isRequired
}

export default TableFrame
