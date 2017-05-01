// We only need to import the modules necessary for initial render
import Activity from './Activity'
import Advisor from './Advisor'
import Competition from './Competition'
import CoreLayout from '../layouts/CoreLayout'
import CoreTable from './CoreTable'
import CounterRoute from './Counter'
import Duck from './Duck'
import Overview from './Overview'
import StudentInfo from './StudentInfo'
import Leave from './Leave'
import Project from './Project'
import Punishment from './Punishment'
import Student from './Student'
import TableView from './TableView'
import Login from './Login'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path        : '/',
  name        : 'Home',
  component   : CoreLayout,
  indexRoute  : Login,
  childRoutes : [
    Overview,
    CounterRoute(store),
    Activity,
    Advisor,
    Competition,
    CoreTable,
    Duck,
    StudentInfo,
    Leave,
    Project,
    Punishment,
    Student,
    TableView
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
