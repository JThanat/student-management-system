import React, { Component } from 'react'
// import { Link } from 'react-router'
import './Table.scss'

class Table extends Component {

  componentWillMount () {
  }

  render () {
    console.log(this.props)

    let thead = this.props.header.map((header, i) => {
      return <th key={i}>{header.title}</th>
    })
    let tbody = this.props.data.map((rowData, i) => {
      let rowbody = this.props.header.map((header, j) => {
        return <td key={j}>{rowData[header.prop]}</td>
      })
      return <tr key={i}>{rowbody}</tr>
    })

    const colSpanSize = this.props.header.length

    return (
      <div>
        <div className='btn btn-primary' onClick={this.props.loadTable} style={{ marginBottom: 15 }}>
          Load Table
        </div>
        <table className='table table-bordered table-striped table-md'>
          <thead>
            <tr>
              {thead}
            </tr>
          </thead>
          <tbody>
            {
              this.props.isLoading
              ? (
                <tr><td style={{ textAlign: 'center' }} colSpan={colSpanSize}>
                  Loading...
                </td></tr>
              ) : (
                this.props.data.length === 0
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

Table.propTypes = {
  loadTable: React.PropTypes.func.isRequired,
  header: React.PropTypes.array.isRequired,
  id: React.PropTypes.string.isRequired,
  data: React.PropTypes.array,
  isLoading: React.PropTypes.bool
}

export default Table
