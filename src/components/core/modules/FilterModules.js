const FILTER_ADD = 'FILTER_ADD'
const FILTER_REMOVE = 'FILTER_REMOVE'

export const initialState = {
  filters: []
}

export const addFilter = (filter, id) => {
  return {
    type: FILTER_ADD,
    filter,
    id
  }
}

export const removeFilter = (filterID, id) => {
  return {
    type: FILTER_REMOVE,
    filterID,
    id
  }
}

export const actions = {
  addFilter,
  removeFilter
}

const changeTotalState = (state, action, handler) => {
  let newState = []
  let isAlreadyMapped = false
  for (let i = 0; i < state.length; i++) {
    if (state[i].id === action.id) {
      newState.push(handler(state[i], action))
      isAlreadyMapped = true
    } else {
      newState.push(state[i])
    }
  }
  if (!isAlreadyMapped) {
    newState.push({
      id: action.id,
      ...handler(initialState, action)
    })
  }
  return newState
}

const actionHandler = {
  [FILTER_ADD]: (state, action) => {
    const newFilters = state.filters.slice(0)
    newFilters.push({
      id: newFilters.length + 1,
      ...action.filter
    })
    return {
      ...state,
      filters: newFilters
    }
  },
  [FILTER_REMOVE]: (state, action) => {
    console.log(state)
    const newFilters = state.filters.filter((f) => f.id !== action.filterID)
    return {
      ...state,
      filters: newFilters
    }
  }
}

export default function filterReducer (state = [], action) {
  const handler = actionHandler[action.type]

  if (handler) {
    return changeTotalState(state, action, handler)
  } else {
    return state
  }
}
