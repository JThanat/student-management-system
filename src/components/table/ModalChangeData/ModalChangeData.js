import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import Promise from 'bluebird'

import './ModalChangeData.scss'

class ValidationError extends Error {
  constructor (obj) {
    super(obj)
    this.obj = obj
  }
}

class ModalChangeData extends Component {

  constructor (props) {
    super(props)

    this.state = {
      data: {},
      error: {},
      errorOverall: ''
    }

    this.handleChangeForm = this.handleChangeForm.bind(this)
    this.validateAndSubmit = this.validateAndSubmit.bind(this)
    this.validate = this.validate.bind(this)
  }

  handleChangeForm (event, property) {
    const newData = {
      ...this.state.data,
      [property]: event.target.value
    }
    this.setState({
      data: newData
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

  showError (errorData, errorOverall) {
    this.setState({
      error: {
        ...errorData
      },
      errorOverall
    })
  }

  clearError () {
    this.showError({}, '')
  }

  validateAndSubmit () {
    const onSubmit = this.props.onSubmit || (() => {})

    new Promise((resolve, reject) => (
        this.validate(resolve, reject, this.props.header, this.state.data)
      ))
      .then(() => onSubmit(this.state.data))
  }

  validate (validResolve, validReject, headers, datas) {
    this.showError(
      this.state.error,
      'Validating...'
    )

    if (!datas) {
      return validReject({ errorOverall: 'Data is empty' })
    }

    let validateList = []

    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]
      const prop = header.prop
      const data = datas[header.prop]

      if (header.isNullable === false) {
        // Check nullable of data

        if (!data) {
          validateList.push(Promise.reject(new ValidationError({
            error: { [prop]: 'This field is not nullable.' },
            errorOverall: `'${prop}' field is not nullable.`
          })))
        }
      } else if (typeof header.validate === 'function') {
        // Custom validation function

        validateList.push(new Promise((resolve, reject) => {
          const rejectWithError = (str) => {
            reject(new ValidationError({
              error: { [prop]: str.toString() },
              errorOverall: `Field '${prop}' is not valid (${str.toString()})`
            }))
          }
          header.validate(resolve, rejectWithError, data)
        }))
      }
    }

    validateList = validateList.map((obj) => obj.then(
      () => ({ status: 'resolve' }),
      (err) => ({ status: 'reject', obj: err.obj })
    ))

    Promise
      .all(validateList)
      .then(results => {
        const rejectList = results.filter(result => result.status === 'reject')
        if (rejectList.length > 0) {
          const rejectErr = rejectList.reduce((acc, val) => {
            return {
              error: {
                ...acc.error,
                ...val.obj.error
              },
              errorOverall: acc.errorOverall ? acc.errorOverall : val.obj.errorOverall
            }
          }, {
            error: {},
            errorOverall: ''
          })

          this.showError(
            rejectErr.error,
            rejectErr.errorOverall
          )
        } else {
          this.clearError()
          validResolve()
        }
      })
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
          <div className='btn btn-primary' onClick={this.validateAndSubmit}>
            {props.type}
          </div>
          {' '}
          <div className='btn btn-secondary' onClick={onCancel}>
            Cancel
          </div>
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
