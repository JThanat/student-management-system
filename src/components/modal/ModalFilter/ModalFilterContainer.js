import { connect } from 'react-redux'
import { initialState as filterInit, actions as filterActions } from '../../core/modules/FilterModules'
import { initialState as modalInit } from '../../core/modules/ModalModules'

import ModalFilter from './ModalFilter'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addFilter: (filter) => dispatch(filterActions.addFilter(filter, ownProps.id)),
    removeFilter: (filterID) => dispatch(filterActions.removeFilter(filterID, ownProps.id))
  }
}

const mapStateToProps = (state, ownProps) => {
  const filterObj = state.filter.find((x) => x.id === ownProps.id) || filterInit
  const modalObj = state.modal.find((x) => x.id === ownProps.id) || modalInit
  console.log(filterObj)
  return {
    filters: filterObj.filters,
    isShow: modalObj.isShow
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalFilter)
