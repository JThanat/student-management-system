import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'

class Login extends Component {

  static propTypes = {
    login: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      user: '',
      error: ''
    }

    this.updateUser = this.updateUser.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentWillMount () {
    this.props.login('')
  }

  updateUser (e) {
    this.setState({
      user: e.target.value.toLowerCase() || ''
    })
  }

  submit () {
    const user = this.state.user
    if (user.substr(0, 7) === 'advisor') {
      const id = user.substr(7)
      if (id === '') {
        this.setState({
          ...this.state,
          error: 'Advisor username must follows by ID.'
        })
      } else {
        this.props.login(user)
        browserHistory.push(`/advisor`)
      }
    } else if (user === 'staff' || user === 'executive') {
      this.props.login(user)
      if (user === 'staff') browserHistory.push(`/student`)
      else browserHistory.push(`/overview`)
    } else {
      this.setState({
        ...this.state,
        error: 'User is incorrect.'
      })
    }
  }

  render () {
    return <div className='row'>
      <div className='col-md-6 offset-md-3 mt-3'>
        <div className='alert alert-info'>
          <div>
            You can login by entering these 3 types of users.
          </div>
          <ol className='pt-2'>
            <li>User: "executive" Password: "executive"</li>
            <li>User: "staff" Password: "staff"</li>
            <li>
              User: "advisor&lt;AVISOR_ID&gt;", Password: "advisor"<br />
              (replace &lt;ADVISOR_ID&gt; with advisor id)
            </li>
          </ol>
        </div>
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
            { this.state.error &&
              <div className='alert alert-danger'>{this.state.error}</div>
            }
            <button type='button' className='btn btn-primary' onClick={this.submit}>Login</button>
          </div>
        </div>
      </div>
    </div>
  }
}

export default Login
