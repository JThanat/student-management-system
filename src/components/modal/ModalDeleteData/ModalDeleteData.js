import React, { Component, PropTypes } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import './ModalDeleteData.scss'

class ModalDeleteData extends Component {

  render () {
    return (
      <Modal isOpen={this.props.isShow} className='modal-md'>
        <ModalHeader>Delete data</ModalHeader>
        <ModalBody>
          <div className='modal-body'>
            Are you sure to delete?
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
          <div className='btn btn-danger' onClick={this.props.onSubmit}>Delete Data
          </div>
          {' '}
          <div className='btn btn-secondary' onClick={this.props.onCancel}>Cancel</div>
        </ModalFooter>
      </Modal>
    )
  }
}

ModalDeleteData.propTypes = {
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

export default ModalDeleteData
