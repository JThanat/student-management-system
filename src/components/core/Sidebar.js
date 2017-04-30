import React, { Component } from 'react'
import { Link } from 'react-router'

class Sidebar extends Component {

  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

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
              <Link to={'/home'} className='nav-link' activeClassName='active'>
                <i className='icon-home' /> Home
              </Link>
            </li>
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
            {/* <li className={this.activeRoute('/icons')}>
              <a className='nav-link nav-dropdown-toggle' href='#' onClick={this.handleClick}>
                <i className='icon-star' /> Icons
              </a>
              <ul className='nav-dropdown-items'>
                <li className='nav-item'>
                  <Link to={'/icons/font-awesome'} className='nav-link' activeClassName='active'>
                    <i className='icon-star' /> Font Awesome
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to={'/icons/simple-line-icons'} className='nav-link' activeClassName='active'>
                    <i className='icon-star' /> Simple Line Icons
                  </Link>
                </li>
              </ul>
            </li> */}
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
