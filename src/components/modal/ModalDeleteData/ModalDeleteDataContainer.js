import { connect } from 'react-redux'
import { initialState } from '../../core/modules/ModalModules'

import ModalDeleteData from './ModalDeleteData'

const mapStateToProps = (state, ownProps) => {
  const modal = state.modal.find((x) => x.id === ownProps.id) || initialState
  return {
    isShow: ownProps.isShow ? ownProps.isShow : modal.isShow,
    errorOverall: ownProps.errorOverall ? ownProps.errorOverall : modal.errorOverall
  }
}

export default connect(mapStateToProps)(ModalDeleteData)
