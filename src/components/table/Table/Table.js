import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import Measure from 'react-measure'
import Promise from 'bluebird'

import './Table.scss'
import TableFrame from '../TableFrame'
import PaginationBar from '../PaginationBar'
import ModalChangeData from '../ModalChangeData'

class Table extends Component {

  constructor (props) {
    super(props)

    this.state = {
      deleteModalShow: false,
      editModalShow: false,
      addModalShow: false,
      editForm: {},
      tableWidth: 0
    }

    this.setShowModal = this.setShowModal.bind(this)
    this.confirmDeleteRow = this.confirmDeleteRow.bind(this)
    this.confirmEditRow = this.confirmEditRow.bind(this)
    this.addRow = this.addRow.bind(this)
  }

  reloadTable = (customSrc = this.props.config.src) => {
    const { config } = this.props
    config.src = Object.assign({}, config.src, customSrc)
    this.props.loadTable(config)
  }

  sliceTableView = () => {
    try {
      const props = this.props
      return props.data.slice(
        props.tableView.range[0],
        props.tableView.range[1]
      )
    } catch (e) {
      return []
    }
  }

  setShowModal = (modelName, status) => {
    this.setState({
      [modelName + 'Show']: status
    })
  }

  confirmDeleteRow = (resolve, reject) => {
    this.setShowModal('deleteModal', true)
    this._confirm = resolve
    this._reject = reject
  }

  confirmEditRow = (resolve, reject, oldData) => {
    this.setShowModal('editModal', true)
    this.modalEditForm.fillData(oldData)
    this._confirm = (formData) => resolve(formData)
    this._reject = reject
  }

  getFillEditFormData () {
    return this.state.editForm
  }

  addRow = () => {
    this.setShowModal('addModal', true)
    this._confirm = (formData) => {
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
    this._reject = () => {}
  }

  componentWillMount () {
    const props = this.props
    const { config } = props

    config.pagination = config.pagination || {
      pageSize: config.pagination.pageSize || 10,
      paginationBarSize: config.pagination.paginationBarSize || 5
    }
  }

  componentDidMount () {
    this.reloadTable()
  }

  render () {
    const props = this.props
    let { tableView } = props
    const config = props.config

    tableView = tableView || {}

    return (
      <div>
        <ModalChangeData
          header={props.config.header}
          type='Add'
          isShow={this.state.addModalShow}
          onSubmit={(formData) => {
            if (this._confirm) this._confirm(formData)
            this.setShowModal('addModal', false)
          }}
          onCancel={() => {
            if (this._reject) this._reject()
            this.setShowModal('addModal', false)
          }} />
        <ModalChangeData
          header={props.config.header}
          type='Edit'
          isShow={this.state.editModalShow}
          ref={(modal) => { this.modalEditForm = modal }}
          onSubmit={(formData) => {
            if (this._confirm) this._confirm(formData)
            this.setShowModal('editModal', false)
          }}
          onCancel={() => {
            if (this._reject) this._reject()
            this.setShowModal('editModal', false)
          }} />
        <Modal isOpen={this.state.deleteModalShow}>
          <ModalHeader>Delete data</ModalHeader>
          <ModalBody>
            Are you sure to delete data.
          </ModalBody>
          <ModalFooter>
            <div className='btn btn-danger' onClick={() => {
              if (this._confirm) this._confirm()
              this.setShowModal('deleteModal', false)
            }}>Delete</div>{' '}
            <div className='btn btn-secondary' onClick={() => {
              if (this._reject) this._reject()
              this.setShowModal('deleteModal', false)
            }}>Cancel</div>
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
          props.logMsg &&
          (<div className='alert alert-info'>
            {props.logMsg}
          </div>)
        }
        {
          props.errorMsg &&
          (<div className='alert alert-danger'>
            <strong>Oops!</strong> {props.errorMsg}
          </div>)
        }
        <div style={{ width: this.state.tableWidth, overflowX: 'auto' }}>
          <TableFrame
            className='table table-responsive table-bordered table-striped table-md'
            data={this.sliceTableView()}
            header={config.header}
            isLoading={props.isLoading || false}

            deleteRowFunc={this.props.deleteRow}
            updateRowFunc={this.props.updateRow}

            confirmDeleteRow={this.confirmDeleteRow}
            confirmEditRow={this.confirmEditRow}

            onError={this.props.onError}
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
  table: React.PropTypes.shape({
    add: React.PropTypes.func
  }),
  header: React.PropTypes.arrayOf(React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    prop: React.PropTypes.string.isRequired,
    formatter: React.PropTypes.func,
    isDelete: React.PropTypes.bool
  })),
  pagination: React.PropTypes.shape({
    pageSize: React.PropTypes.number.isRequired,
    paginationBarSize: React.PropTypes.number.isRequired
  }),
  src: React.PropTypes.shape({
    url: React.PropTypes.string.isRequired,
    parser: React.PropTypes.func
  })
}

Table.propTypes = {
  // derived from container
  loadTable: React.PropTypes.func.isRequired,
  changePage: React.PropTypes.func.isRequired,
  changePageTab: React.PropTypes.func.isRequired,
  deleteRow: React.PropTypes.func.isRequired,
  updateRow: React.PropTypes.func.isRequired,
  onError: React.PropTypes.func.isRequired,
  showLog: React.PropTypes.func.isRequired,
  data: React.PropTypes.array,
  isLoading: React.PropTypes.bool,
  errorMsg: React.PropTypes.string,

  config: React.PropTypes.shape({
    table: tableConfigTypes.table.isRequired,
    header: tableConfigTypes.header.isRequired,
    pagination: tableConfigTypes.pagination,
    src: tableConfigTypes.src.isRequired
  }).isRequired,
  id: React.PropTypes.string.isRequired
}

export default Table
