// import { injectReducer } from '../../store/reducers'
import TableView from './components/TableView'

export default (store) => ({
  name : 'Table',
  path : 'table',
  component: TableView
  /*  Async getComponent is only invoked when route matches   */
  // getComponent (nextState, cb) {
  //   /*  Webpack - use 'require.ensure' to create a split point
  //       and embed an async module loader (jsonp) when bundling   */
  //   require.ensure([], (require) => {
  //     /*  Webpack - use require callback to define
  //         dependencies for bundling   */
  //     const Table = require('./containers/TableContainer').default
  //     const reducer = require('./modules/table').default

  //     /*  Add the reducer to the store on key 'counter'  */
  //     injectReducer(store, { key: 'table', reducer })

  //     /*  Return getComponent   */
  //     cb(null, Table)

  //   /* Webpack named bundle   */
  //   }, 'table')
  // }
})
