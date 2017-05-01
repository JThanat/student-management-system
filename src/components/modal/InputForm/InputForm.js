import React, { Component, PropTypes } from 'react'

class InputForm extends Component {

  constructor (props) {
    super(props)

    console.log(props)

    this.state = {
      isFinish: false,
      option: []
    }
  }

  optionList (header) {
    let optionList = []

    if (!this.props.fillData) optionList.push(<option />)
    for (const eachType of header.type) {
      if (typeof eachType === 'object') {
        optionList.push(<option value={eachType.val}>{eachType.title} ({eachType.val})</option>)
      } else {
        optionList.push(<option value={eachType}>{eachType}</option>)
      }
    }

    return optionList
  }

  render () {
    const { header } = this.props
    const { prop } = header

    if (header.type instanceof Array) {
      return <select
        className='form-control'
        defaultValue={this.props.fillData}
        onChange={(e) => this.handleChangeForm(e, prop)}>
        {this.optionList(header)}
      </select>
    } else if (typeof header.type === 'function') {
      if (this.state.isFinish) {
        return <select
          className='form-control'
          defaultValue={this.props.fillData}
          onChange={(e) => this.handleChangeForm(e, prop)}>
          {this.state.option}
        </select>
      } else {
        return 'Loading...'
      }
    } else {
      return <input
        className='form-control'
        name={prop}
        value={this.props.fillData}
        onChange={this.props.onChange}
        disabled={this.props.disabled}
        />
    }
  }

}

InputForm.propTypes = {
  header: PropTypes.any.isRequired,
  fillData: PropTypes.any.isRequired,
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func
}

export default InputForm
