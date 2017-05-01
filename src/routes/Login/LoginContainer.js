import { connect } from 'react-redux'

import Login from './Login'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (role) => {
      dispatch({
        type: 'LOGIN',
        role
      })
    }
  }
}

export const LoginReducer = (state = { role: '' }, action) => {
  if (action.type === 'LOGIN') {
    return {
      ...state,
      role: action.role
    }
  } else {
    return state
  }
}

export default connect(null, mapDispatchToProps)(Login)
