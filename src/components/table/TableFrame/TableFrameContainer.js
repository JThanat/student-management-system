import { connect } from 'react-redux'
import { changeData, changeFillData, showModal } from '../../core/modules/ModalModules'

import TableFrame from './TableFrame'

const mapDispatchToProps = (dispatch, ownProps) => ({
  showModal: (isShow, id) => dispatch(showModal(isShow, id)),
  changeModalData: (data, id) => dispatch(changeData(data, id)),
  changeModalFillData: (data, id) => dispatch(changeFillData(data, id))
})

export default connect(null, mapDispatchToProps)(TableFrame)
