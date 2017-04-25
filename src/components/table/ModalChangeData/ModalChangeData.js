import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import './ModalChangeData.scss'
// import Promise from 'bluebird'

class ModalChangeData extends Component {

  constructor (props) {
    super(props)

    this.state = {
      data: {},
      error: {},
      errorOverall: ''
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

  addError (errorData, errorOverall) {
    this.setState({
      error: {
        ...this.state.error,
        ...errorData
      },
      errorOverall
    })
  }

  validate (headers, datas) {
    if (!datas) {
      this.setState({ errorOverall: 'Data is empty' })
      return false
    }
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]
      const prop = header.prop
      const data = datas[header.prop]
      if (header.isNullable === false) {
        if (!data) {
          this.addError(
            { [prop]: 'This field is not nullable.' },
            `'${prop}' field is not nullable.`
          )
        } else {
          this.addError({ [prop]: '' }, '')
        }
      }
    }
  }

  bodyContent () {
    const { header, type } = this.props

    let content = []
    for (let i = 0; i < header.length; i++) {
      const prop = header[i].prop
      if (prop === '_rid' || header[i].isDelete || header[i].isEdit) continue
      content.push(
        <div className='col-6 input-box' key={i}>
          <label key={i}>{header[i].title} <strong>({ header[i].prop })</strong></label>
          <div>
            <input
              className='form-control'
              name={prop}
              value={this.state.data ? (this.state.data[prop] || '') : ''}
              onChange={(e) => this.handleChangeForm(e, prop)}
              disabled={this.isEditable(type) && header[i].isEditable === false}
              />
          </div>
          {
            this.state.error[prop] &&
            (<div className='alert alert-danger'>{this.state.error[prop]}</div>)
          }
        </div>
      )
    }

    return (
      <div className='row'>
        {content}
      </div>
    )
  }

  render () {
    const { props } = this

    const onSubmit = props.onSubmit || (() => {})
    const onCancel = props.onCancel || (() => {})

    return (
      <Modal isOpen={props.isShow} className='modal-lg'>
        <ModalHeader>{props.type} data</ModalHeader>
        <ModalBody>
          <div className='modal-body'>
            {this.bodyContent()}
            {
              this.state.errorOverall &&
              (<div className='alert alert-danger'>{this.state.errorOverall}</div>)
            }
          </div>
        </ModalBody>
        <ModalFooter>
          <div className='btn btn-primary' onClick={() => {
            if (this.validate(props.header, this.state.data) === true) {
              onSubmit(this.state.data)
            }
          }}>{props.type}</div>
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
