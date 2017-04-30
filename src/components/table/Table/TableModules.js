import 'whatwg-fetch'

const TABLE_LOAD_COMPLETE = 'TABLE_LOAD_COMPLETE'
const TABLE_LOADING = 'TABLE_LOADING'
const TABLE_ERROR = 'TABLE_ERROR'
const TABLE_LOG = 'TABLE_LOG'

const PAGINATION_CHANGE_PAGE = 'PAGINATION_CHANGE_PAGE'
const PAGINATION_CHANGE_PAGE_TAB = 'PAGINATION_CHANGE_PAGE_TAB'

const UPDATE_ROW = 'TABLE_UPDATE_ROW'

const initialTableState = {
  isLoading: false,
  error: '',
  data: [],
  header: []
}

const convertErrorToString = (err) => {
  if (err instanceof Error) {
    return err.message
  } else {
    return err.toString()
  }
}

export const changePage = (page, config, id) => {
  return {
    type: PAGINATION_CHANGE_PAGE,
    pageNo: page,
    config,
    id
  }
}

export const changePageTab = (startPage, id) => {
  return {
    type: PAGINATION_CHANGE_PAGE_TAB,
    startPage,
    id
  }
}

export const showErrorMsg = (msg, id) => {
  return {
    type: TABLE_ERROR,
    error: convertErrorToString(msg),
    id
  }
}

export const showLogMsg = (msg, id) => {
  return {
    type: TABLE_LOG,
    msg: convertErrorToString(msg),
    id
  }
}

export const loadTable = (config, id) => {
  const { src } = config
  return (dispatch, getState) => {
    if (!src || !src.url) {
      dispatch(showErrorMsg('URL did not provided', id))
    } else {
      dispatch({
        type: TABLE_LOADING,
        id
      })
      const options = src.options || {
        method: 'GET'
      }
      return fetch(src.url, options)
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            return response.json().then((msg) => Promise.reject(new Error(msg.err)))
          }
        })
        .then((body) => {
          let rawBody = { ...body }
          if (typeof src.parser === 'function') {
            rawBody = src.parser(rawBody)
          }
          body = []
          for (let i = 0; i < rawBody.length; i++) {
            body.push({
              _rid: i + 1,
              ...rawBody[i % rawBody.length]
            })
          }
          dispatch({
            type: TABLE_LOAD_COMPLETE,
            data: body,
            id
          })
          dispatch(changePage(1, config, id))
          dispatch(showLogMsg('', id))
        })
        .catch((err) => {
          dispatch(showLogMsg('', id))
          if (err instanceof Response) {
            dispatch(showErrorMsg(`${err.status} ${err.statusText}`, id))
          } else {
            dispatch(showErrorMsg(`${err.toString()}`, id))
          }
        })
    }
  }
}

export const deleteRow = (rowID, tableID) => {
  return {
    type: UPDATE_ROW,
    updateData: [],
    rowID,
    id: tableID
  }
}

export const updateRow = (rowID, updateData, tableID) => {
  return {
    type: UPDATE_ROW,
    rowID,
    updateData: [updateData],
    id: tableID
  }
}

const findTableState = (state, id) => {
  const curTable = state.find((tableState) => tableState.id === id)
  if (curTable === undefined) return Object.assign({}, initialTableState)
  return curTable
}

const changeTableState = (state, tid, objToMerge) => {
  const id = state.findIndex((tableState) => tableState.id === tid)
  let newState = state.slice()
  let newTableState = Object.assign(
    initialTableState,
    (id !== -1 ? newState[id] : {}),
    objToMerge
  )
  if (id !== -1) {
    newState[id] = Object.assign({}, newTableState)
  } else {
    newState.push(newTableState)
  }
  return newState
}

export const actions = {
  loadTable,
  changePage,
  changePageTab,
  updateRow,
  deleteRow,
  showErrorMsg,
  showLogMsg
}

const ACTION_HANDLERS = {
  [TABLE_LOAD_COMPLETE] : (state, action) => {
    return {
      id: action.id,
      isLoading: false,
      error: null,
      data: action.data
    }
  },
  [TABLE_LOADING] : (state, action) => {
    return {
      id: action.id,
      error: null,
      isLoading: true
    }
  },
  [TABLE_ERROR] : (state, action) => {
    return {
      id: action.id,
      isLoading: false,
      error: action.error
    }
  },
  [TABLE_LOG] : (state, action) => {
    return {
      id: action.id,
      logMsg: action.msg
    }
  },
  [PAGINATION_CHANGE_PAGE] : (state, action) => {
    const curTable = findTableState(state, action.id)
    if (curTable.data === undefined) throw new Error(`Table ${action.id} is empty`)
    const dataSize = curTable.data.length
    const eachPageSize = action.config.pagination.pageSize
    let pageNo = action.pageNo || curTable.tableView.pageNo || 1
    const pageAll = Math.ceil(dataSize / eachPageSize)
    if (pageNo > pageAll) pageNo = pageAll
    return {
      id: action.id,
      tableView: {
        ...curTable.tableView,
        pageNo,
        pageAll,
        range: [(pageNo - 1) * eachPageSize, pageNo * eachPageSize]
      }
    }
  },
  [PAGINATION_CHANGE_PAGE_TAB] : (state, action) => {
    const curTable = findTableState(state, action.id)
    return {
      id: action.id,
      tableView: {
        ...curTable.tableView,
        startPage: action.startPage
      }
    }
  },
  [UPDATE_ROW] : (state, action) => {
    const { data } = findTableState(state, action.id)
    if (data === undefined) throw new Error(`Table ${action.id} is empty`)
    const lastID = data[data.length - 1]._rid
    if (action.rowID < 0 || action.rowID > lastID) {
      throw new Error(`Change at ${action.rowID} index is incorrect. Because data size is ${lastID}`)
    }
    const newData = data.slice(0)
    const removeID = data.findIndex((row) => row._rid === action.rowID)
    newData.splice(removeID, 1, ...action.updateData)
    return {
      id: action.id,
      data: newData
    }
  }
}

export default function TableReducer (state = [], action) {
  const handler = ACTION_HANDLERS[action.type]

  try {
    let newState = handler ? changeTableState(state, action.id, handler(state, action)) : state
    return newState
  } catch (e) {
    console.error(e)
    return state
  }
}
