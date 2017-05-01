import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'

class Login extends Component {

  static propTypes = {
    login: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      user: ''
    }

    this.updateUser = this.updateUser.bind(this)
    this.submit = this.submit.bind(this)
  }

  updateUser (e) {
    this.setState({
      user: e.target.value.toLowerCase() || ''
    })
  }

  submit () {
    console.log(this.state)
    this.props.login(this.state.user)
    switch (this.state.user) {
      case 'advisor':
        browserHistory.push('/advisor')
        break
      case 'staff':
        browserHistory.push('/student')
        break
      case 'executive':
        browserHistory.push('/overview')
        break
    }
  }

  render () {
    return <div className='row'>
      <div className='col-md-6 offset-md-3 mt-5'>
        <div className='card'>
          <div className='card-block'>
            <h4 className='card-title mb-0'>Login</h4>
            <div className='form-group my-3'>
              <label className='form-control-label'>User</label>
              <input type='text' className='form-control form-control-success' onChange={this.updateUser} />
            </div>
            <div className='form-group my-3'>
              <label className='form-control-label'>Password</label>
              <input type='password' className='form-control form-control-success' />
            </div>
            <div className='btn btn-primary' onClick={this.submit}>Login</div>
          </div>
        </div>
      </div>
    </div>
  }
}

export default Login
