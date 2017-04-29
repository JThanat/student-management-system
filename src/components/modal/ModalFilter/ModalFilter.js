import React, { Component, PropTypes } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import './ModalFilter.scss'

class ModalFilter extends Component {

  getSelectFieldList () {
    let list = []
    for (let i = 0; i < this.props.header.length; i++) {
      const header = this.props.header[i]
      if (header.isEdit || header.isDelete) continue
      list.push(<option value={header.prop} key={i}>{header.title} ({header.prop})</option>)
    }
    return list
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
              <select className='form-control mb-2 mr-sm-2 mb-sm-0' defaultValue='='>
                <option value='='>=</option>
                <option value='>'>&gt;</option>
                <option value='<'>&lt;</option>
                <option value='LIKE'>LIKE</option>
              </select>
              <select className='filter-rule-select form-control mb-2 mr-sm-2 mb-sm-0'>
                {this.getSelectFieldList()}
              </select>
              <button className='btn btn-primary'>เพิ่ม</button>
            </div>

            <div className='title'>Filter List</div>
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
