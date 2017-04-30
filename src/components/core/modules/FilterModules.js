const FILTER_ADD = 'FILTER_ADD'
const FILTER_REMOVE = 'FILTER_REMOVE'
const FILTER_UPDATE = 'FILTER_UPDATE'
const FILTER_UPDATE_ALL = 'FILTER_UPDATE_ALL'

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

export const updateFilter = (filter, filterID, id) => {
  return {
    type: FILTER_UPDATE,
    filter,
    filterID,
    id
  }
}

export const updateFilterAll = (filters, id) => {
  return {
    type: FILTER_UPDATE_ALL,
    filters,
    id
  }
}

export const actions = {
  addFilter,
  removeFilter,
  updateFilter,
  updateFilterAll
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
    const newFilters = state.filters.filter((f) => f.id !== action.filterID)
    return {
      ...state,
      filters: newFilters
    }
  },
  [FILTER_UPDATE]: (state, action) => {
    const newFilters = state.filters.map((val) => {
      if (val.id === action.filterID) {
        return action.filter
      } else {
        return val
      }
    })
    return {
      ...state,
      filters: newFilters
    }
  },
  [FILTER_UPDATE_ALL]: (state, action) => {
    console.log(action)
    return {
      ...state,
      filters: action.filters
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
