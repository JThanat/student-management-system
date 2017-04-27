import React, { Component, PropTypes } from 'react'
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
          /**
           * Handle data format when current column is delete column
           */

          let delBtn = typeof header.formatter === 'function'
            ? header.formatter()
            : (<div className='btn btn-danger btn-sm' data-attach-on-delete>Delete</div>)

          const onDelete = () => {
            if (this.props.deleteRowModalID) {
              this.props.changeModalData(
                {
                  rowData,
                  header
                },
                this.props.deleteRowModalID
              )
              this.props.showModal(true, this.props.deleteRowModalID)
            }
          }

          delBtn = React.cloneElement(
            delBtn,
            {
              onClick: delBtn.props['data-attach-on-delete'] ? onDelete : null
            }
          )

          return <td key={j}>{delBtn}</td>
        } else if (header.isEdit) {
          /**
           * Handle data format when current column is edit column
           */

          let updateBtn = typeof header.formatter === 'function'
            ? header.formatter()
            : (<div className='btn btn-warning btn-sm'>Edit</div>)

          updateBtn = React.cloneElement(
            updateBtn,
            {
              onClick: () => {
                if (this.props.editRowModalID) {
                  this.props.changeModalFillData(rowData, this.props.editRowModalID)
                  this.props.changeModalData(
                    {
                      rowData,
                      header
                    },
                    this.props.editRowModalID
                  )
                  this.props.showModal(true, this.props.editRowModalID)
                }
              }
            }
          )

          return <td key={j}>{updateBtn}</td>
        } else {
          /**
           * Handle data format when current column is normal value
           */
          let val = rowData ? rowData[header.prop] : ''
          if (typeof header.formatter === 'function') {
            val = header.formatter(val, i, rowData)
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
  /**
   * Derived from redux
   */

  changeModalFillData: PropTypes.func.isRequired,
  changeModalData: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,

  /**
   * Props values
   */

  className: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  header: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,

  editRowModalID: PropTypes.string,
  deleteRowModalID: PropTypes.string
}

export default TableFrame
