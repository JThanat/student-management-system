import React, { Component } from 'react'

class PaginationBar extends Component {

  render () {
    let { startPage, paginationBarSize, pageAll, pageNo, onChangePage, onChangePageTab } = this.props
    startPage = startPage || 1
    pageNo = pageNo || 1
    pageAll = pageAll || 1
    paginationBarSize = paginationBarSize || 5
    onChangePage = onChangePage || (() => {})
    onChangePageTab = onChangePageTab || (() => {})

    return (
      <ul className='pagination'>
        {
          (function () {
            let prev = startPage - paginationBarSize
            if (prev >= 1) {
              return (<li className='page-item' onClick={() => onChangePageTab(prev)}>
                <span className='page-link'>Prev</span>
              </li>)
            } else {
              return null
            }
          })()
        }
        {
          pageAll > 1 && Array(paginationBarSize).fill(1).map((el, i) => {
            const id = i + (startPage || 1)
            if (id <= pageAll) {
              return (<li
                className={'page-item ' + (id === pageNo ? 'active' : '')}
                key={i}
                onClick={() => onChangePage(id)}>
                <span className='page-link'>{ id }</span>
              </li>)
            } else {
              return null
            }
          })
        }
        {
          (function () {
            let next = paginationBarSize + startPage
            if (next <= pageAll) {
              return (<li className='page-item' onClick={() => onChangePageTab(next)}>
                <span className='page-link'>Next</span>
              </li>)
            } else {
              return null
            }
          })()
        }
      </ul>
    )
  }
}

PaginationBar.propTypes = {
  startPage: React.PropTypes.number,
  paginationBarSize: React.PropTypes.number,
  pageNo: React.PropTypes.number,
  pageAll: React.PropTypes.number,

  onChangePage: React.PropTypes.func,
  onChangePageTab: React.PropTypes.func
}

export default PaginationBar
