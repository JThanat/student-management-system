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
            {/* <li className='nav-item'>
              <Link to={'/counter'} className='nav-link' activeClassName='active'>
                <i className='icon-speedometer' /> Counter
              </Link>
            </li>
            <li className='nav-item'>
              <Link to={'/duck'} className='nav-link' activeClassName='active'>
                <i className='fa fa-paw' /> Duck
              </Link>
            </li> */}
            <li className='nav-item'>
              <Link to={'/coretable'} className='nav-link' activeClassName='active'>
                <i className='fa fa-list-ul' /> Core Table
              </Link>
            </li>
            <li className='nav-item'>
              <Link to={'/table'} className='nav-link' activeClassName='active'>
                <i className='fa fa-list-ul' /> Table
              </Link>
            </li>
            <li className='nav-item'>
              <Link to={'/student'} className='nav-link' activeClassName='active'>
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
