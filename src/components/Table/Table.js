import React, { Component } from 'react'
import TableFrame from '../TableFrame'
import PaginationBar from '../PaginationBar'

class Table extends Component {

  deleteRow = (row, id) => {
    console.log(row, id)
  }

  editRow = (row, id) => {
    console.log(row, id)
  }

  componentWillMount () {
    const props = this.props
    const { config } = props

    config.pagination = config.pagination || {
      pageSize: config.pagination.pageSize || 10,
      paginationBarSize: config.pagination.paginationBarSize || 5
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

    tableView = tableView || {}

    return (
      <div>
        <div
          className='btn btn-primary'
          onClick={() => this.props.loadTable(this.src, this.config)}
          style={{ marginBottom: 15 }}>
          Load Table
        </div>
        {
          props.errorMsg &&
          (<div className='alert alert-danger' role='alert'>
            <strong>Oops!</strong> {props.errorMsg}
          </div>)
        }
        <TableFrame
          data={tableView.data || []}
          header={config.header}
          isLoading={props.isLoading || false}
          className='table table-bordered table-striped table-md' />
        <nav>
          {
            tableView.data &&
            <PaginationBar
              startPage={tableView.startPage}
              paginationBarSize={config.pagination.paginationBarSize}
              pageNo={tableView.pageNo}
              pageAll={tableView.pageAll}

              onChangePage={(no) => this.props.changePage(no, this.config)}
              onChangePageTab={(startPage) => this.props.changePageTab(startPage)}
              />
          }
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
    paginationBarSize: React.PropTypes.number.isRequired
  })
}).isRequired

Table.propTypes = {
  // derived from container
  loadTable: React.PropTypes.func.isRequired,
  changePage: React.PropTypes.func.isRequired,
  changePageTab: React.PropTypes.func.isRequired,
  data: React.PropTypes.array,
  isLoading: React.PropTypes.bool,
  errorMsg: React.PropTypes.string,

  config: configTypes,
  id: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired
}

export default Table
