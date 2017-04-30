import React, { Component, PropTypes } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import './ModalFilter.scss'

class ModalFilter extends Component {

  constructor (props) {
    super(props)

    this.state = {
      selectedOperator: '=',
      selectedField: ''
    }

    this.onOperatorChange = this.onOperatorChange.bind(this)
    this.onFieldListChange = this.onFieldListChange.bind(this)
    this.addRule = this.addRule.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  getSelectFieldList () {
    let list = [<option value='' key={0} />]
    for (let i = 0; i < this.props.header.length; i++) {
      const header = this.props.header[i]
      if (header.isEdit || header.isDelete) continue
      list.push(<option value={header.prop} key={i + 1}>{header.title} ({header.prop})</option>)
    }
    return list
  }

  getFilterListContent () {
    if (this.props.filters.length === 0) {
      return <i style={{ color: '#666' }}>No filter list</i>
    }
    return this.props.filters.map((elm, i) => (
      <div className='input-group filter-rule-list' key={i}>
        <span className='input-group-addon'>{elm.id}</span>
        <span className='input-group-addon'>{elm.field}&nbsp;{elm.operator}</span>
        <input
          value={elm.value}
          type='text' className='form-control' placeholder='value'
          onChange={(e) => this.onRuleValueChange(e, elm.id)} />
        <span className='input-group-btn'>
          <button
            className='btn btn-danger' type='button'
            onClick={() => this.props.removeFilter(elm.id)}>
            Remove
          </button>
        </span>
      </div>
    ))
  }

  onOperatorChange (e) {
    this.setState({
      ...this.state,
      selectedOperator: e.target.value
    })
  }

  onFieldListChange (e) {
    this.setState({
      ...this.state,
      selectedField: e.target.value
    })
  }

  onRuleValueChange (e, id) {
    let curFilters = this.props.filters.slice(0)
    curFilters = curFilters.map((filter) => {
      if (filter.id === id) {
        return {
          ...filter,
          value: e.target.value
        }
      } else {
        return filter
      }
    })

    this.props.updateFilterAll(curFilters)
  }

  addRule () {
    if (this.state.selectedField === '') return null
    this.props.addFilter({
      operator: this.state.selectedOperator,
      field: this.state.selectedField,
      value: ''
    })
  }

  onSubmit () {
    if (this.props.filters.length === 0) {
      return this.props.onSubmit('')
    }
    const filterStr = this.props.filters.map((filter) => {
      switch (filter.operator) {
        case '=' :
          return `${filter.field} = "${filter.value}"`
        case '>' :
          return `${filter.field}> ${filter.value}`
        case '<' :
          return `${filter.field} < ${filter.value}`
        case 'LIKE' :
          return `${filter.field} LIKE "${filter.value}"`
        default :
          return null
      }
    }).filter((val) => val).join(' AND ')
    this.props.onSubmit(` WHERE ${filterStr}`)
  }

  render () {
    return (
      <Modal isOpen={this.props.isShow} className='modal-md'>
        <ModalHeader>Filter data</ModalHeader>
        <ModalBody>
          <div className='modal-body'>
            <div className='title' style={{ marginTop: 0 }}>Add your filter</div>
            <hr />
            <div className='form-inline'>
              <div className='mb-2 mr-sm-2 mb-sm-0'>Operator</div>
              <select
                className='filter-rule-select form-control mb-2 mr-sm-2 mb-sm-0'
                onChange={this.onFieldListChange}>
                {this.getSelectFieldList()}
              </select>
              <select className='form-control mb-2 mr-sm-2 mb-sm-0' defaultValue='=' onChange={this.onOperatorChange}>
                <option value='='>=</option>
                <option value='>'>&gt;</option>
                <option value='<'>&lt;</option>
                <option value='LIKE'>LIKE</option>
              </select>
              <button className='btn btn-primary' onClick={this.addRule}>Add</button>
            </div>

            <div className='title'>Filter List</div>
            <hr />
            <div>
              {this.getFilterListContent()}
            </div>
            {
              this.props.errorOverall &&
              (<div
                className='alert alert-danger'>
                {this.props.errorOverall}
              </div>)
            }
          </div>
        </ModalBody>
        <ModalFooter>
          <div className='btn btn-primary' onClick={this.onSubmit}>Filter Data
          </div>
          {' '}
          <div className='btn btn-secondary' onClick={this.props.onCancel}>Cancel</div>
        </ModalFooter>
      </Modal>
    )
  }
}

ModalFilter.propTypes = {
  /**
   * Derived from redux
   */
  addFilter: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  updateFilterAll: PropTypes.func.isRequired,

  filters: PropTypes.array.isRequired,
  isShow: PropTypes.bool.isRequired,
  errorOverall: PropTypes.string.isRequired,

  /**
   * Prop values
   */

  header: PropTypes.arrayOf(PropTypes.object),
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,

  id: PropTypes.string.isRequired
}

export default ModalFilter
