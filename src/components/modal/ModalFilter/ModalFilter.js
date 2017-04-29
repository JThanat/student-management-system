import React, { Component, PropTypes } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import './ModalFilter.scss'

class ModalFilter extends Component {

  render () {
    return (
      <Modal isOpen={this.props.isShow} className='modal-md'>
        <ModalHeader>Filter data</ModalHeader>
        <ModalBody>
          <div className='modal-body'>
            Are you sure to filter?
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

  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,

  id: PropTypes.string.isRequired
}

export default ModalFilter
