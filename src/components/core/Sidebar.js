import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { logout } from '../../routes/Login/LoginContainer'

class Sidebar extends Component {

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.logout = this.logout.bind(this)
  }

  handleClick (e) {
    e.preventDefault()
    e.target.parentElement.classList.toggle('open')
  }

  activeRoute (routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown'
  }

  logout (e) {
    this.props.logout()
  }

  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ?
  // "nav nav-second-level collapse in" : "nav nav-second-level collapse";
  // }

  render () {
    const role = this.props.role

    return (
      <div className='sidebar'>
        <nav className='sidebar-nav'>
          <ul className='nav'>
            { (role === '') &&
            <li className='nav-item'>
              <Link to={'/'} className='nav-link'>
                <i className='icon-home' /> Login
              </Link>
            </li>}

            { (role === 'executive' || role === 'debug') &&
            <li className='nav-item'>
              <Link to={'/overview'} className='nav-link'>
                <i className='icon-home' /> Overview
              </Link>
            </li>}

            { (role === 'staff' || role === 'debug') &&
            <div>
              <li className='nav-item'>
                <Link to={'/student'} className='nav-link' activeClassName='active'>
                  <i className='icon-people' /> Student
                </Link>
              </li>
              <li className='nav-item'>
                <Link to={'/competition'} className='nav-link' activeClassName='active'>
                  <i className='icon-layers' /> Competition
                </Link>
              </li>
              <li className='nav-item'>
                <Link to={'/punishment'} className='nav-link' activeClassName='active'>
                  <i className='icon-notebook' /> Punishment
                </Link>
              </li>
              <li className='nav-item'>
                <Link to={'/leave'} className='nav-link' activeClassName='active'>
                  <i className='icon-logout' /> Leave
                </Link>
              </li>
              <li className='nav-item'>
                <Link to={'/project'} className='nav-link' activeClassName='active'>
                  <i className='icon-folder-alt' /> Project
                </Link>
              </li>
              <li className='nav-item'>
                <Link to={'/activity'} className='nav-link' activeClassName='active'>
                  <i className='icon-event' /> Activity
                </Link>
              </li>
            </div>}

            { (role.substr(0, 7) === 'advisor' || role === 'debug') &&
            <li className='nav-item'>
              <Link to={'/advisor'} className='nav-link' activeClassName='active'>
                <i className='icon-user' /> Advisor
              </Link>
            </li>}

            { (role === 'debug') &&
            <div>
              <li className='nav-item'>
                <Link to={'/coretable'} className='nav-link' activeClassName='active'>
                  <i className='icon-layers' /> Core Table
                </Link>
              </li>
              <li className='nav-item'>
                <Link to={'/table'} className='nav-link' activeClassName='active'>
                  <i className='icon-layers' /> Table
                </Link>
              </li>
            </div>}
            { (role !== '') &&
            <li className='nav-item'>
              <Link to={'/'} onClick={this.logout} className='nav-link'>
                <i className='icon-logout' /> Logout
              </Link>
            </li>}
          </ul>
        </nav>
      </div>
    )
  }
}

Sidebar.propTypes = {
  location: PropTypes.object,
  role: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
}

export default connect(
  state => ({ role : state.login.role || '' }),
  dispatch => ({ logout: () => dispatch(logout()) })
)(Sidebar)
