import React, { Component } from 'react'
import { Link } from 'react-router'

class Sidebar extends Component {

  handleClick (e) {
    e.preventDefault()
    e.target.parentElement.classList.toggle('open')
  }

  activeRoute (routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown'
  }

  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ?
  // "nav nav-second-level collapse in" : "nav nav-second-level collapse";
  // }

  render () {
    return (

      <div className='sidebar'>
        <nav className='sidebar-nav'>
          <ul className='nav'>
            <li className='nav-item'>
              <Link to={'/counter'} className='nav-link' activeClassName='active'>
                <i className='icon-speedometer' /> Counter <span className='badge badge-info'>NEW</span>
              </Link>
              <Link to={'/duck'} className='nav-link'>
                <i className='icon-speedometer' /> Duck
              </Link>
              <Link to={'/coretable'} className='nav-link'>
                <i className='icon-speedometer' /> Core Table
              </Link>
              <Link to={'/table'} className='nav-link'>
                <i className='icon-speedometer' /> Table
              </Link>
              <Link to={'/student'} className='nav-link'>
                <i className='fa fa-users' /> Student
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

Sidebar.propTypes = {
  location: React.PropTypes.object
}

export default Sidebar
