// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import Duck from './Duck'
import CoreTable from './CoreTable'
import CounterRoute from './Counter'
import Student from './Student'
import TableView from './TableView'
import Punishment from './Punishment'
import Leave from './Leave'
import Competition from './Competition'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path        : '/',
  name        : 'Home',
  component   : CoreLayout,
  indexRoute  : Home,
  childRoutes : [
    Home,
    CounterRoute(store),
    Duck,
    CoreTable,
    Student,
    TableView,
    Punishment,
    Leave,
    Competition
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
