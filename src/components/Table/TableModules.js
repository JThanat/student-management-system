import 'whatwg-fetch'

export const TABLE_LOAD_COMPLETE = 'TABLE_LOAD_COMPLETE'
export const TABLE_LOADING = 'TABLE_LOADING'
export const TABLE_LOAD_ERROR = 'TABLE_LOAD_ERROR'

export const CHANGE_PAGE = 'CHANGE_PAGE'
export const CHANGE_PAGE_TAB = 'CHANGE_PAGE_TAB'

const initialTableState = {
  isLoading: false,
  error: '',
  data: [],
  header: []
}

export const changePage = (page, config, id) => {
  return {
    type: CHANGE_PAGE,
    pageNo: page,
    config,
    id
  }
}

export const changePageTab = (startPage, id) => {
  return {
    type: CHANGE_PAGE_TAB,
    startPage,
    id
  }
}

export const loadTable = (src, config, id) => {
  return (dispatch, getState) => {
    if (!src || !src.url) {
      dispatch({
        type: TABLE_LOAD_ERROR,
        error: 'URL did not provided',
        id
      })
    } else {
      dispatch({
        type: TABLE_LOADING,
        id
      })
      return fetch(src.url)
        .then((response) => response.text())
        .then((body) => {
          try {
            let rawBody = JSON.parse(body)
            body = []
            for (let i = 0; i < 42; i++) {
              body.push({
                id: i + 1,
                ...rawBody[i % rawBody.length]
              })
            }
            dispatch({
              type: TABLE_LOAD_COMPLETE,
              data: body,
              id
            })
            dispatch(changePage(1, config, id))
          } catch (e) {
            console.error(e)
            dispatch({
              type: TABLE_LOAD_ERROR,
              error: `File formatting at ${src.url} is incorrect (only JSON format)`,
              id
            })
          }
        })
    }
  }
}

// export const actions = {
//   loadTable
// }

const findTableState = (state, id) => {
  return state.find((tableState) => tableState.id === id)
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
    newState[id] = newTableState
  } else {
    newState.push(newTableState)
  }
  return newState
}

const ACTION_HANDLERS = {
  [TABLE_LOAD_COMPLETE] : (state, action) => {
    return changeTableState(state, action.id, {
      id: action.id,
      isLoading: false,
      error: null,
      data: action.data
    })
  },
  [TABLE_LOADING] : (state, action) => {
    return changeTableState(state, action.id, {
      id: action.id,
      error: null,
      isLoading: true
    })
  },
  [TABLE_LOAD_ERROR] : (state, action) => {
    return changeTableState(state, action.id, {
      id: action.id,
      isLoading: false,
      error: action.error.toString()
    })
  },
  [CHANGE_PAGE] : (state, action) => {
    const curTable = findTableState(state, action.id)
    if (curTable === undefined) throw new Error(`Table ${action.id} not found`)
    if (curTable.data === undefined) throw new Error(`Table ${action.id} is empty`)
    const dataSize = curTable.data.length
    const eachPageSize = action.config.pagination.pageSize
    if ((action.pageNo - 1) * eachPageSize >= dataSize) {
      throw new Error(`Page number in table ${action.id} is incorrect`)
    }
    return changeTableState(state, action.id, {
      id: action.id,
      tableView: {
        ...curTable.tableView,
        pageNo: action.pageNo,
        pageAll: Math.ceil(dataSize / eachPageSize),
        data: curTable.data.slice((action.pageNo - 1) * eachPageSize, action.pageNo * eachPageSize)
      }
    })
  },
  [CHANGE_PAGE_TAB] : (state, action) => {
    const curTable = findTableState(state, action.id)
    if (curTable === undefined) throw new Error(`Table ${action.id} not found`)
    return changeTableState(state, action.id, {
      id: action.id,
      tableView: {
        ...curTable.tableView,
        startPage: action.startPage
      }
    })
  }
}

export default function TableReducer (state = [], action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
