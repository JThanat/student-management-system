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
  }

  getSelectFieldList () {
    let list = [<option value='' />]
    for (let i = 0; i < this.props.header.length; i++) {
      const header = this.props.header[i]
      if (header.isEdit || header.isDelete) continue
      list.push(<option value={header.prop} key={i}>{header.title} ({header.prop})</option>)
    }
    return list
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

  addRule () {
    if (this.state.selectedField === '') return null
    this.props.addFilter({
      operator: this.state.selectedOperator,
      field: this.state.selectedField,
      value: ''
    })
  }

  render () {
    return (
      <Modal isOpen={this.props.isShow} className='modal-lg'>
        <ModalHeader>Filter data</ModalHeader>
        <ModalBody>
          <div className='modal-body'>
            <div className='title' style={{ marginTop: 0 }}>Add your filter</div>
            <div className='form-inline'>
              <div className='mb-2 mr-sm-2 mb-sm-0'>Operator</div>
              <select className='form-control mb-2 mr-sm-2 mb-sm-0' defaultValue='=' onChange={this.onOperatorChange}>
                <option value='='>=</option>
                <option value='>'>&gt;</option>
                <option value='<'>&lt;</option>
                <option value='LIKE'>LIKE</option>
              </select>
              <select
                className='filter-rule-select form-control mb-2 mr-sm-2 mb-sm-0' 
                onChange={this.onFieldListChange}>
                {this.getSelectFieldList()}
              </select>
              <button className='btn btn-primary' onClick={this.addRule}>เพิ่ม</button>
            </div>

            <div className='title'>Filter List</div>
            <div>{this.props.filters ? JSON.stringify(this.props.filters) : 'false'}</div>
            {/*
              this.props.errorOverall &&
              (<div
                className='alert alert-danger'>
                {this.props.errorOverall}
              </div>)
            */}
          </div>
        </ModalBody>
        <ModalFooter>
          <div className='btn btn-primary' onClick={this.props.onSubmit}>Filter Data
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

  filters: PropTypes.array.isRequired,
  isShow: PropTypes.bool.isRequired,
  // errorOverall: PropTypes.string.isRequired,

  /**
   * Prop values
   */

  header: PropTypes.arrayOf(PropTypes.object),
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,

  id: PropTypes.string.isRequired
}

export default ModalFilter
