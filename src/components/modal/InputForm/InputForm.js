import React, { Component, PropTypes } from 'react'

class InputForm extends Component {

  constructor (props) {
    super(props)

    this.state = {
      isFinish: false,
      option: [],
      error: ''
    }

    this.fetchOptionList = this.fetchOptionList.bind(this)
  }

  optionList (header) {
    const prop = this.props.header.prop
    let optionList = []
    let i = 1

    if (!this.props.fillData) optionList.push(<option key={prop + 0}>Select...</option>)
    for (const eachType of header.type) {
      if (typeof eachType === 'object') {
        optionList.push(<option key={prop + i} value={eachType.val}>{eachType.title} ({eachType.val})</option>)
      } else {
        optionList.push(<option key={prop + i} value={eachType}>{eachType}</option>)
      }
      i++
    }

    return optionList
  }

  fetchOptionList (func) {
    new Promise(func).then((data) => {
      this.setState({
        ...this.state,
        option: this.optionList({
          type: data
        }),
        isFinish: true
      })
    })
  }

  componentWillMount () {
    if (typeof this.props.header.type === 'function') {
      this.fetchOptionList(this.props.header.type)
    }
  }

  render () {
    const { header } = this.props
    const { prop } = header

    if (header.type instanceof Array) {
      return <select
        className='form-control'
        defaultValue={this.props.fillData}
        onChange={this.props.onChange}>
        {this.optionList(header)}
      </select>
    } else if (typeof header.type === 'function') {
      if (this.state.isFinish) {
        return <select
          className='form-control'
          defaultValue={this.props.fillData}
          onChange={this.props.onChange}>
          {this.state.option}
        </select>
      } else {
        return <div className='form-control' style={{ background: '#DDD' }}>Load Option...</div>
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
