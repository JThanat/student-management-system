import React, { Component } from 'react'
import Header from '../../components/core/Header'
import Sidebar from '../../components/core/Sidebar'
import Aside from '../../components/core/Aside'
import Footer from '../../components/core/Footer'
import '../../styles/core.scss'
import '../../styles/coreui.scss'

import Breadcrumbs from 'react-breadcrumbs'

class CoreLayout extends Component {
  render () {
    return (
      <div className='app'>
        <Header />
        <div className='app-body'>
          <Sidebar {...this.props} />
          <main className='main'>
            <Breadcrumbs
              wrapperElement='ol'
              wrapperClass='breadcrumb'
              itemClass='breadcrumb-item'
              separator=''
              routes={this.props.routes}
              params={this.props.params}
            />
            <div className='container-fluid'>
              {this.props.children}
            </div>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    )
  }
}

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired,
  routes: React.PropTypes.any.isRequired,
  params: React.PropTypes.any.isRequired
}

export default CoreLayout
