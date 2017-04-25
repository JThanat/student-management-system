import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
// import Promise from 'bluebird'

class ModalChangeData extends Component {

  constructor (props) {
    super(props)

    this.state = {
      data: {}
    }

    this.handleChangeForm = this.handleChangeForm.bind(this)
  }

  handleChangeForm (event, property) {
    this.setState({
      data: {
        ...this.state.data,
        [property]: event.target.value
      }
    })
  }

  isEditable (type) {
    if (type === 'Edit') return true
    return false
  }

  fillData (fillData) {
    this.setState({
      data: fillData
    })
  }

  bodyContent () {
    const { header, type } = this.props

    let content = []
    for (let i = 0; i < header.length; i++) {
      const prop = header[i].prop
      if (prop === '_rid' || header[i].isDelete || header[i].isEdit) continue
      content.push(
        <div className='form-group row' key={i}>
          <label className='col-4 col-form-label'>{header[i].title}</label>
          <div className='col-8'>
            <input
              className='form-control'
              name={prop}
              value={this.state.data ? (this.state.data[prop] || '') : ''}
              onChange={(e) => this.handleChangeForm(e, prop)}
              disabled={this.isEditable(type) && header[i].isEditable === false}
              />
          </div>
        </div>
      )
    }

    return content
  }

  render () {
    const { props } = this

    const onSubmit = props.onSubmit || (() => {})
    const onCancel = props.onCancel || (() => {})

    return (
      <Modal isOpen={props.isShow}>
        <ModalHeader>{props.type} data</ModalHeader>
        <ModalBody>
          {this.bodyContent()}
        </ModalBody>
        <ModalFooter>
          <div className='btn btn-danger' onClick={() => onSubmit(this.state.data)}>{props.type}</div>
          {' '}
          <div className='btn btn-secondary' onClick={onCancel}>Cancel</div>
        </ModalFooter>
      </Modal>
    )
  }
}

ModalChangeData.propTypes = {
  header: React.PropTypes.arrayOf(React.PropTypes.object),
  type: React.PropTypes.oneOf(['Edit', 'Add']),
  isShow: React.PropTypes.bool.isRequired,
  onSubmit: React.PropTypes.func,
  onCancel: React.PropTypes.func
}

export default ModalChangeData
