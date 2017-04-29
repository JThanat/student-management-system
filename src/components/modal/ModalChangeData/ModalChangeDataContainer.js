import { connect } from 'react-redux'
import { actions, initialState } from '../../core/modules/ModalModules'

import ModalChangeData from './ModalChangeData'

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeFillData: (data) => dispatch(actions.changeFillData(data, ownProps.id)),
  showError: (error) => dispatch(actions.showError(error, ownProps.id)),
  showErrorOverall: (errorAll) => dispatch(actions.showErrorOverall(errorAll, ownProps.id))
})

const mapStateToProps = (state, ownProps) => {
  const modal = state.modal.find((x) => x.id === ownProps.id) || initialState
  return {
    isShow: ownProps.isShow ? ownProps.isShow : modal.isShow,
    fillData: ownProps.data ? ownProps.data : modal.fill,
    error: ownProps.error ? ownProps.error : modal.error,
    errorOverall: ownProps.errorOverall ? ownProps.errorOverall : modal.errorOverall
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalChangeData)
