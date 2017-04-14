
export const TABLE_LOAD_COMPLETE = 'TABLE_LOAD_COMPLETE'
export const TABLE_LOADING = 'TABLE_LOADING'
export const TABLE_LOAD_ERROR = 'TABLE_LOAD_ERROR'

const initialTableState = {
  isLoading: false,
  error: '',
  data: [],
  header: []
}

export const loadTable = (id) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: TABLE_LOADING,
        id
      })
      setTimeout(() => {
        dispatch({
          type: TABLE_LOAD_COMPLETE,
          data: [
            {
              username: 'Eiei eueu',
              date: '2012/01/01',
              role: 'Member',
              status: 'Active'
            },
            {
              username: 'Zbyněk Phoibos',
              date: '2014/01/01',
              role: 'Staff',
              status: 'Banned'
            },
            {
              username: 'Einar Randall',
              date: '2014/02/06',
              role: 'Admin',
              status: 'Inactive'
            },
            {
              username: 'Félix Troels',
              date: '2012/03/01',
              role: 'Member',
              status: 'Pending'
            }
          ],
          id
        })
      }, 1000 + Math.random() * 2000)
    })
  }
}

// export const actions = {
//   loadTable
// }

const ACTION_HANDLERS = {
  [TABLE_LOAD_COMPLETE] : (state, action) => {
    const id = state.findIndex((tableState) => tableState.id === action.id)
    let newState = state.slice()
    let newTableState = Object.assign(
      initialTableState,
      (id !== -1 ? newState[id] : {}),
      {
        id: action.id,
        isLoading: false,
        data: action.data
      }
    )
    if (id !== -1) {
      newState[id] = newTableState
    } else {
      newState.push(newTableState)
    }
    return newState
  },
  [TABLE_LOADING] : (state, action) => {
    const id = state.findIndex((tableState) => tableState.id === action.id)
    let newState = state.slice()
    let newTableState = Object.assign(
      initialTableState,
      (id !== -1 ? newState[id] : {}),
      {
        id: action.id,
        isLoading: true
      }
    )
    if (id !== -1) {
      newState[id] = newTableState
    } else {
      newState.push(newTableState)
    }
    return newState
  }
}

export default function TableReducer (state = [], action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
