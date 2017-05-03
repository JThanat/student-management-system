import { connect } from 'react-redux'

import Login from './Login'

export const login = (role) => {
  return {
    type: 'LOGIN',
    role
  }
}

export const logout = () => ({
  type: 'LOGOUT'
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (role) => dispatch(login(role)),
    logout: () => dispatch(logout())
  }
}

export const LoginReducer = (state = { role: '' }, action) => {
  if (action.type === 'LOGIN') {
    return {
      ...state,
      role: action.role
    }
  } else if (action.type === 'LOGOUT') {
    return {
      ...state,
      role: ''
    }
  } else {
    return state
  }
}

export default connect(null, mapDispatchToProps)(Login)
