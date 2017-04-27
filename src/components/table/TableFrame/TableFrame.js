import React, { Component } from 'react'
import Promise from 'bluebird'
import './TableFrame.scss'

class TableFrame extends Component {

  log (msg) {
    if (typeof this.props.showLog === 'function') {
      this.props.showLog(msg)
    }
  }

  onError (reason) {
    if (typeof this.props.onError === 'function') {
      this.props.onError(reason)
    }
  }

  generateOnDelete (header, rowData) {
    return () => {
      const confirmDeleteRow = this.props.func.confirmDeleteRow || ((resolve) => resolve())
      header.onDelete = header.onDelete || ((resolve) => resolve())

      new Promise((resolve, reject) => confirmDeleteRow(resolve, reject, rowData))
        .then(
          () => {
            this.log('Deleting...')
            return new Promise((resolve, reject) => header.onDelete(resolve, reject, rowData))
          },
          () => Promise.reject(new Error('cancel'))
        )
        .then(
          () => {
            this.props.func.deleteRow(rowData._rid)
            this.log('')
          },
          (reason) => {
            this.log('')
            if (typeof this.props.onError === 'function') {
              if (reason instanceof Error && reason.message === 'cancel') {
                this.onError('')
              } else {
                this.onError(reason)
              }
            }
          }
        )
    }
  }

  generateOnUpdate (header, rowData) {
    return () => {
      const confirmUpdateRow = this.props.func.confirmUpdateRow || ((resolve, reject, data) => resolve(data))
      header.onUpdate = header.onUpdate || ((resolve, reject, data) => resolve(data))

      new Promise(
        (resolve, reject) => confirmUpdateRow(resolve, reject, JSON.parse(JSON.stringify(rowData)))
      ).then(
          (newData) => {
            this.log('Editing...')
            return new Promise(
              (resolve, reject) => header.onUpdate(resolve, reject, newData)
            )
          },
          () => Promise.reject(new Error('cancel'))
        )
        .then(
          (newData) => {
            this.log('')
            if (typeof newData !== 'object') {
              return this.onError(new Error('Update data is not object type. Please check your `config.header`.'))
            }
            this.props.func.updateRow(rowData._rid, newData)
          },
          (reason) => {
            this.log('')
            if (typeof this.props.onError === 'function') {
              if (reason instanceof Error && reason.message === 'cancel') {
                this.onError('')
              } else {
                this.onError(reason)
              }
            }
          }
        )
    }
  }

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

          const onDelete = this.generateOnDelete(header, rowData)

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
              onClick: this.generateOnUpdate(header, rowData)
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
  className: React.PropTypes.string.isRequired,
  data: React.PropTypes.array.isRequired,
  header: React.PropTypes.array.isRequired,
  isLoading: React.PropTypes.bool.isRequired,

  func: React.PropTypes.shape({
    deleteRow: React.PropTypes.func,
    updateRow: React.PropTypes.func,
    confirmDeleteRow: React.PropTypes.func,
    confirmUpdateRow: React.PropTypes.func
  }),

  onError: React.PropTypes.func,
  showLog: React.PropTypes.func
}

export default TableFrame
