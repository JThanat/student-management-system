import { connect } from 'react-redux'
import { loadTable } from './TableModules'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Table from './Table'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadTable : () => dispatch(loadTable(ownProps.id))
})

const mapStateToProps = (state, ownProps) => {
  const table = state.table.find((x) => x.id === ownProps.id) || []
  return {
    data: table.data || [],
    isLoading: table.isLoading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)
