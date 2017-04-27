import React, { Component, PropTypes } from 'react'
import Measure from 'react-measure'
import Promise from 'bluebird'

import './Table.scss'
import TableFrame from '../TableFrame'
import PaginationBar from '../PaginationBar'
import ModalChangeData from '../ModalChangeData'
import ModalDeleteData from '../ModalDeleteData'
import { staticID } from '../../../utils/unique'

class Table extends Component {

  constructor (props) {
    super(props)

    this.state = {
      tableWidth: 0
    }

    this.MODAL_ADD_ID = staticID(`${this.props.id}.addModal`)
    this.MODAL_EDIT_ID = staticID(`${this.props.id}.editModal`)
    this.MODAL_DELETE_ID = staticID(`${this.props.id}.deleteModal`)

    this.submitDelete = this.submitDelete.bind(this)
    this.submitEdit = this.submitEdit.bind(this)
    this.submitAdd = this.submitAdd.bind(this)
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

  removeRID = (data) => {
    let newData = { ...data }
    delete newData._rid
    return newData
  }

  submitDelete = () => {
    const { header, rowData } = this.props.getModalData(this.MODAL_DELETE_ID)

    this.props.showTableLog('Deleting...')
    this.props.showTableError('')

    new Promise((resolve, reject) => {
      if (header.onDelete) {
        header.onDelete(resolve, reject, this.removeRID(rowData))
      } else {
        throw new Error('Table config `onDelete` is not implemented')
      }
    }).then(
      () => {
        this.props.deleteRow(rowData._rid)
        this.props.showTableLog('')
        this.props.showTableError('')
        this.props.setModalErrorOverall('', this.MODAL_DELETE_ID)
        this.props.setModalShow(false, this.MODAL_DELETE_ID)
      },
      (reason) => {
        this.props.showTableLog('')
        this.props.showTableError(reason)
        this.props.setModalErrorOverall(reason, this.MODAL_DELETE_ID)
      }
    )
  }

  submitEdit = () => {
    const { header } = this.props.getModalData(this.MODAL_EDIT_ID)
    const newData = this.props.getModalFillData(this.MODAL_EDIT_ID)

    this.props.showTableLog('Editing...')
    this.props.showTableError('')

    new Promise((resolve, reject) => {
      if (header.onEdit) {
        header.onEdit(resolve, reject, this.removeRID(newData))
      } else {
        throw new Error('Table config `onEdit` is not implemented')
      }
    }).then(
      () => {
        this.props.showTableLog('')
        this.props.showTableError('')
        this.props.setModalErrorOverall('', this.MODAL_EDIT_ID)
        this.props.setModalShow(false, this.MODAL_EDIT_ID)
        this.props.updateRow(newData._rid, newData)
      },
      (reason) => {
        this.props.showTableLog('')
        this.props.showTableError(reason)
        this.props.setModalErrorOverall(reason, this.MODAL_EDIT_ID)
      }
    )
  }

  submitAdd = () => {
    const newData = this.props.getModalFillData(this.MODAL_ADD_ID)
    const addFunc =
      (this.props.config.table ? this.props.config.table.add : null) ||
      ((resolve) => resolve())

    this.props.showTableLog('Adding data...')
    this.props.showTableError('')

    new Promise((resolve, reject) => addFunc(resolve, reject, this.removeRID(newData)))
      .then(
        () => {
          this.props.showTableLog('')
          this.props.showTableError('')
          this.props.setModalErrorOverall('', this.MODAL_ADD_ID)
          this.props.setModalShow(false, this.MODAL_ADD_ID)
          this.props.setModalFillData({}, this.MODAL_ADD_ID)
          this.reloadTable()
        },
        (reason) => {
          this.props.showTableLog('')
          this.props.showTableError(reason)
          this.props.setModalErrorOverall(reason, this.MODAL_ADD_ID)
        }
      )
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

    return (
      <div>
        <ModalChangeData
          id={this.MODAL_ADD_ID}
          header={this.props.config.header}
          type='Add'
          onSubmit={this.submitAdd}
          onCancel={() => { this.props.setModalShow(false, this.MODAL_ADD_ID) }}
          />
        <ModalChangeData
          id={this.MODAL_EDIT_ID}
          header={this.props.config.header}
          type='Edit'
          onSubmit={this.submitEdit}
          onCancel={() => { this.props.setModalShow(false, this.MODAL_EDIT_ID) }}
          />
        <ModalDeleteData
          id={this.MODAL_DELETE_ID}
          onSubmit={this.submitDelete}
          onCancel={() => { this.props.setModalShow(false, this.MODAL_DELETE_ID) }}
          />
        <Measure
          onMeasure={(dimensions) => {
            this.setState({
              tableWidth: dimensions.width
            })
          }}>
          <div />
        </Measure>
        <div className='nav-table' style={{ marginBottom: 15 }}>
          <div
            className='btn btn-primary'
            onClick={() => this.props.setModalShow(true, this.MODAL_ADD_ID)}>
            <i className='fa fa-plus' /> Add Data
          </div>
          <div
            className='btn btn-primary'
            onClick={this.reloadTable}>
            <i className='fa fa-refresh' /> Refresh
          </div>
        </div>
        {
          this.props.tableLogMsg &&
          (<div className='alert alert-info'>
            {this.props.tableLogMsg}
          </div>)
        }
        {
          this.props.tableErrorMsg &&
          (<div className='alert alert-danger'>
            <strong>Oops!</strong> {this.props.tableErrorMsg}
          </div>)
        }
        <div style={{ width: this.state.tableWidth, overflowX: 'auto' }}>
          <TableFrame
            className='table table-responsive table-bordered table-striped table-md'
            data={this.sliceTableView()}
            header={config.header}
            isLoading={this.props.tableIsLoading || false}

            editRowModalID={this.MODAL_EDIT_ID}
            deleteRowModalID={this.MODAL_DELETE_ID}
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
  showTableError: PropTypes.func.isRequired,
  showTableLog: PropTypes.func.isRequired,

  setModalShow: PropTypes.func.isRequired,
  setModalData: PropTypes.func.isRequired,
  setModalFillData: PropTypes.func.isRequired,
  setModalErrorOverall: PropTypes.func.isRequired,
  getModalData: PropTypes.func.isRequired,
  getModalFillData: PropTypes.func.isRequired,

  data: PropTypes.array,
  tableIsLoading: PropTypes.bool,
  tableErrorMsg: PropTypes.string,
  tableView: PropTypes.object,
  tableLogMsg: PropTypes.string,

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
