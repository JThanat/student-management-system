import { combineReducers } from 'redux'
import locationReducer from './location'
import TableReducer from '../components/table/Table/TableModules'
import modalChangeDataReducer from '../components/table/ModalChangeData/ModalChangeDataModules'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    table: TableReducer,
    modal: modalChangeDataReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
