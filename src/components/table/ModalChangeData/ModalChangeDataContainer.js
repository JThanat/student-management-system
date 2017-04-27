import { connect } from 'react-redux'
import { actions, initialState } from './ModalChangeDataModules'

import ModalChangeData from './ModalChangeData'

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeData: (data) => dispatch(actions.changeData(data)),
  showError: (error) => dispatch(actions.showError(error)),
  showErrorOverall: (errorAll) => dispatch(actions.showErrorOverall(errorAll))
})

const mapStateToProps = (state, ownProps) => {
  const modal = state.modal.find((x) => x.id === ownProps.id) || initialState
  return {
    isShow: ownProps.isShow ? ownProps.isShow : modal.isShow,
    data: ownProps.data ? ownProps.data : modal.data,
    error: ownProps.error ? ownProps.error : modal.error,
    errorOverall: ownProps.errorOverall ? ownProps.errorOverall : modal.errorOverall
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalChangeData)
