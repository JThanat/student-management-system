import React, { Component, PropTypes } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import './ModalFilter.scss'

class ModalFilter extends Component {

  render () {
    return (
      <Modal isOpen={this.props.isShow} className='modal-lg'>
        <ModalHeader>Filter data</ModalHeader>
        <ModalBody>
          <div className='modal-body'>
            <div className='title' style={{ marginTop: 0 }}>Add your filter</div>
            <form className='form-inline'>
              <label className='mr-sm-2'>Preference</label>
              <label className='custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0'>
                <input type='checkbox' className='custom-control-input' />
                <span className='custom-control-indicator'></span>
                <span className='custom-control-description'>Remember my preference</span>
              </label>

              <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
            <div className='form-inline'>
              <select className='form-control mb-2 mr-sm-2 mb-sm-0'>
                <option selected>Choose...</option>
                <option value='1'>One</option>
                <option value='2'>Two</option>
                <option value='3'>Three</option>
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
