/**
 * Types
 */
export const Types = {
  REQUEST: 'ADD_USER_REQUEST',
  SUCCESS: 'ADD_USER_SUCCESS',
  FAILURE: 'ADD_USER_FAILURE',
  CLEAR_ERROR: 'USER_CLEAR_ERROR'
}

/**
 * Reducers
 */
const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false
}

export default function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.REQUEST:
      return { ...state, loading: true, error: false }
    case Types.SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload.newUserData]
      }
    case Types.FAILURE:
      return { ...state, loading: false, error: action.payload.error }
    case Types.CLEAR_ERROR:
      return { ...state, error: false }
    default:
      return state
  }
}

/**
 * Actions
 */
export const Actions = {
  addUserRequest: userData => ({
    type: Types.REQUEST,
    payload: { ...userData }
  }),
  addUserSuccess: newUserData => ({
    type: Types.SUCCESS,
    payload: { newUserData }
  }),
  addUserFailure: error => ({
    type: Types.FAILURE,
    payload: { error }
  }),
  userClearError: () => ({
    type: Types.CLEAR_ERROR
  })
}
