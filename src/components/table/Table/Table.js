import React, { Component, PropTypes } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import Measure from 'react-measure'
import Promise from 'bluebird'

import './Table.scss'
import TableFrame from '../TableFrame'
import PaginationBar from '../PaginationBar'
import ModalChangeData from '../ModalChangeData'
import { staticID } from '../../../utils/unique'

class Table extends Component {

  constructor (props) {
    super(props)

    this.state = {
      deleteModalShow: false
    }

    this.MODAL_ADD_ID = staticID(`${this.props.id}.addModal`)
    this.MODAL_EDIT_ID = staticID(`${this.props.id}.editModal`)

    this.confirmDeleteRow = this.confirmDeleteRow.bind(this)
    this.confirmEditRow = this.confirmEditRow.bind(this)
    this.addRow = this.addRow.bind(this)
    this.onError = this.onError.bind(this)
  }

  reloadTable = () => {
    this.props.loadTable(this.props.config)
  }

  sliceTableView = () => {
    try {
      return this.props.data.slice(
        this.props.tableView.range[0],
        this.props.tableView.range[1]
      )
    } catch (e) {
      return []
    }
  }

  confirmDeleteRow = (resolve, reject, deleteData) => {
    this.setState({
      ...this.state,
      deleteModalShow: true
    })
    this.onModalConfirm = () => {
      resolve(deleteData)
    }
    this.onModalCancel = () => reject(new Error('cancel'))
  }

  confirmEditRow = (resolve, reject, oldData) => {
    this.props.setModalShow(true, this.MODAL_EDIT_ID)
    this.props.setModalData(oldData, this.MODAL_EDIT_ID)
    this.onModalConfirm = (formData) => {
      resolve(formData)
    }
    this.onModalCancel = () => reject(new Error('cancel'))
  }

  addRow () {
    this.props.setModalShow(true, this.MODAL_ADD_ID)
    this.onModalConfirm = (formData) => {
      const addFunc =
        (this.props.config.table ? this.props.config.table.add : null) ||
        ((resolve) => resolve())

      this.props.showLog('Adding data...')
      new Promise((resolve, reject) => addFunc(resolve, reject, formData))
        .then(
          () => {
            this.props.showLog('')
            this.reloadTable()
          },
          (reason) => this.props.onError(reason)
        )
    }
    this.onModalCancel = () => {}
  }

  onError (reason) {
    console.log(reason)
    // if (this.state.editModalShow) {
    //   if (this.modalEditForm) {
    //     this.modalEditForm.updateErrorOverall(reason.toString())
    //   }
    // } else if (this.state.deleteModalShow) {
    //   if (this.modalDeleteForm) {
    //     this.modalDeleteForm.updateErrorOverall(reason.toString())
    //   }
    // } else if (this.state.addModalShow) {

    // }
    this.props.onError(reason)
  }

  /**
   * Mount function
   */

  componentWillMount () {
    const { config } = this.props

    config.pagination = config.pagination || {
      pageSize: config.pagination.pageSize || 10,
      paginationBarSize: config.pagination.paginationBarSize || 5
    }
  }

  componentDidMount () {
    this.reloadTable()
  }

  render () {
    let { tableView } = this.props
    const config = this.props.config

    tableView = tableView || {}

    const tableFrameFunc = {
      deleteRow: this.props.deleteRow,
      updateRow: this.props.updateRow,
      confirmDeleteRow: this.confirmDeleteRow,
      confirmUpdateRow: this.confirmEditRow
    }

    return (
      <div>
        <ModalChangeData
          id={this.MODAL_ADD_ID}
          header={this.props.config.header}
          type='Add'
          onSubmit={
            (formData) => {
              if (this.onModalConfirm) this.onModalConfirm(formData)
              this.setShowModal('addModal', false)
            }
          }
          onCancel={
            () => {
              if (this.onModalCancel) this.onModalCancel()
              this.props.setModalShow(false, this.MODAL_ADD_ID)
            }
          }
          />
        <ModalChangeData
          id={this.MODAL_EDIT_ID}
          header={this.props.config.header}
          type='Edit'
          onSubmit={
            (formData) => {
              if (this.onModalConfirm) this.onModalConfirm(formData)
              this.setShowModal('editModal', false)
            }
          }
          onCancel={
            () => {
              if (this.onModalCancel) this.onModalCancel()
              this.props.setModalShow(false, this.MODAL_EDIT_ID)
            }
          }
          />
        <Modal isOpen={this.state.deleteModalShow}>
          <ModalHeader>Delete data</ModalHeader>
          <ModalBody>
            Are you sure to delete data.
          </ModalBody>
          <ModalFooter>
            <div
              className='btn btn-danger'
              onClick={
                () => {
                  if (this.onModalConfirm) this.onModalConfirm()
                }
              }>
              Delete
            </div>
            {' '}
            <div
              className='btn btn-secondary'
              onClick={
                () => {
                  if (this.onModalCancel) this.onModalCancel()
                  this.setState({
                    ...this.state,
                    deleteModalShow: false
                  })
                }
              }>
              Cancel
            </div>
          </ModalFooter>
        </Modal>
        <Measure
          onMeasure={(dimensions) => {
            this.setState({
              tableWidth: dimensions.width
            })
          }}>
          <div />
        </Measure>
        <div className='nav-table' style={{ marginBottom: 15 }}>
          {/* <div
            className='btn btn-primary'
            onClick={() => this.setShowModal('editModal', true)}>
            Test Modal
          </div> */}
          <div
            className='btn btn-primary'
            onClick={this.addRow}>
            <i className='fa fa-plus' /> Add Data
          </div>
          <div
            className='btn btn-primary'
            onClick={this.reloadTable}>
            <i className='fa fa-refresh' /> Refresh
          </div>
        </div>
        {
          this.props.logMsg &&
          (<div className='alert alert-info'>
            {this.props.logMsg}
          </div>)
        }
        {
          this.props.errorMsg &&
          (<div className='alert alert-danger'>
            <strong>Oops!</strong> {this.props.errorMsg}
          </div>)
        }
        <div style={{ width: this.state.tableWidth, overflowX: 'auto' }}>
          <TableFrame
            className='table table-responsive table-bordered table-striped table-md'
            data={this.sliceTableView()}
            header={config.header}
            isLoading={this.props.isLoading || false}

            func={tableFrameFunc}

            onError={this.onError}
            showLog={this.props.showLog}
            />
        </div>
        <nav>{
          tableView.range &&
          <PaginationBar
            startPage={tableView.startPage}
            paginationBarSize={config.pagination.paginationBarSize}
            pageNo={tableView.pageNo}
            pageAll={tableView.pageAll}

            onChangePage={(no) => this.props.changePage(no, config)}
            onChangePageTab={(startPage) => this.props.changePageTab(startPage)}
            />
        }</nav>
      </div>
    )
  }
}

// Configuration Type

const tableConfigTypes = {
  table: PropTypes.shape({
    add: PropTypes.func
  }),
  header: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    prop: PropTypes.string.isRequired,
    formatter: PropTypes.func,
    isDelete: PropTypes.bool
  })),
  pagination: PropTypes.shape({
    pageSize: PropTypes.number.isRequired,
    paginationBarSize: PropTypes.number.isRequired
  }),
  src: PropTypes.shape({
    url: PropTypes.string.isRequired,
    parser: PropTypes.func
  })
}

Table.propTypes = {
  /**
   * Derived from redux
   */

  loadTable: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
  changePageTab: PropTypes.func.isRequired,

  deleteRow: PropTypes.func.isRequired,
  updateRow: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  showLog: PropTypes.func.isRequired,

  data: PropTypes.array,
  isLoading: PropTypes.bool,
  errorMsg: PropTypes.string,
  tableView: PropTypes.object,
  logMsg: PropTypes.string,

  setModalShow: PropTypes.func.isRequired,
  setModalData: PropTypes.func.isRequired,
  setModalErrorOverall: PropTypes.func.isRequired,

  /**
   * Props values
   */

  config: PropTypes.shape({
    table: tableConfigTypes.table.isRequired,
    header: tableConfigTypes.header.isRequired,
    pagination: tableConfigTypes.pagination,
    src: tableConfigTypes.src.isRequired
  }).isRequired,
  id: PropTypes.string.isRequired
}

export default Table
