import 'whatwg-fetch'

export const TABLE_LOAD_COMPLETE = 'TABLE_LOAD_COMPLETE'
export const TABLE_LOADING = 'TABLE_LOADING'
export const TABLE_LOAD_ERROR = 'TABLE_LOAD_ERROR'

const initialTableState = {
  isLoading: false,
  error: '',
  data: [],
  header: []
}

export const loadTable = (src, id) => {
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
            body = JSON.parse(body)
            dispatch({
              type: TABLE_LOAD_COMPLETE,
              data: body,
              id
            })
          } catch (e) {
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

const changeTableState = (state, action, objToMerge) => {
  const id = state.findIndex((tableState) => tableState.id === action.id)
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
    return changeTableState(state, action, {
      id: action.id,
      isLoading: false,
      error: null,
      data: action.data
    })
  },
  [TABLE_LOADING] : (state, action) => {
    return changeTableState(state, action, {
      id: action.id,
      error: null,
      isLoading: true
    })
  },
  [TABLE_LOAD_ERROR] : (state, action) => {
    console.log(action)
    return changeTableState(state, action, {
      id: action.id,
      isLoading: false,
      error: action.error.toString()
    })
  }
}

export default function TableReducer (state = [], action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
