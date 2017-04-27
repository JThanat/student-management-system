const MODAL_CHANGE_DATA_SHOW = 'MODAL_CHANGE_DATA_SHOW'
const MODAL_CHANGE_DATA_ADD_DATA = 'MODAL_CHANGE_DATA_ADD_DATA'
const MODAL_CHANGE_DATA_ERROR = 'MODAL_CHANGE_DATA_ERROR'
const MODAL_CHANGE_DATA_ERROR_OVERALL = 'MODAL_CHANGE_DATA_OVERALL'
const MODAL_CHANGE_DATA_FILL = 'MODAL_CHANGE_DATA_FILL'

export const initialState = {
  data: {},
  error: {},
  fill: {},
  errorOverall: '',
  isShow: false
}

export const showModal = (isShow, id) => {
  return {
    type: MODAL_CHANGE_DATA_SHOW,
    isShow,
    id
  }
}

export const changeData = (data, id) => {
  return {
    type: MODAL_CHANGE_DATA_ADD_DATA,
    data,
    id
  }
}

export const showError = (error, id) => {
  let errorSerialize = {}
  for (let key in error) {
    if (error[key] instanceof Error) {
      errorSerialize[key] = error[key].message
    } else {
      errorSerialize[key] = error[key].toString()
    }
  }
  return {
    type: MODAL_CHANGE_DATA_ERROR,
    error: errorSerialize,
    id
  }
}

export const showErrorOverall = (errorOverall, id) => {
  if (errorOverall instanceof Error) {
    errorOverall = errorOverall.message
  } else {
    errorOverall = errorOverall.toString()
  }
  return {
    type: MODAL_CHANGE_DATA_ERROR_OVERALL,
    errorOverall: errorOverall,
    id
  }
}

export const changeFillData = (fill, id) => {
  return {
    type: MODAL_CHANGE_DATA_FILL,
    fill,
    id
  }
}

export const actions = {
  showModal,
  changeData,
  showError,
  showErrorOverall,
  changeFillData
}

const actionHandler = {
  [MODAL_CHANGE_DATA_SHOW]: (state, action) => {
    return {
      ...state,
      isShow: action.isShow
    }
  },
  [MODAL_CHANGE_DATA_ADD_DATA]: (state, action) => {
    return {
      ...state,
      data: action.data
    }
  },
  [MODAL_CHANGE_DATA_ERROR]: (state, action) => {
    return {
      ...state,
      error: action.error
    }
  },
  [MODAL_CHANGE_DATA_ERROR_OVERALL]: (state, action) => {
    return {
      ...state,
      errorOverall: action.errorOverall
    }
  },
  [MODAL_CHANGE_DATA_FILL]: (state, action) => {
    return {
      ...state,
      fill: action.fill
    }
  }
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

export default function modalChangeDataReducer (state = [], action) {
  const handler = actionHandler[action.type]

  if (handler) {
    return changeTotalState(state, action, handler)
  } else {
    return state
  }
}
