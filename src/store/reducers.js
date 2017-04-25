import { combineReducers } from 'redux'
import locationReducer from './location'
import TableReducer from '../components/table/Table/TableModules'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    table: TableReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
