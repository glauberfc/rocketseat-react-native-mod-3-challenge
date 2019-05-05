/**
 * Types
 */
export const Types = {
  OPEN: 'OPEN_MODAL',
  CLOSE: 'CLOSE_MODAL'
}

/**
 * Reducer
 */

const INITIAL_STATE = {
  isVisible: false,
  latitude: null,
  longitude: null
}

export default function modal(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.OPEN:
      return {
        isVisible: true,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude
      }
    case Types.CLOSE:
      return INITIAL_STATE
    default:
      return state
  }
}

/**
 * Action creators
 */
export const Actions = {
  openModal: event => {
    const {
      coordinate: { latitude, longitude }
    } = event.nativeEvent

    return {
      type: Types.OPEN,
      payload: { latitude, longitude }
    }
  },
  closeModal: () => ({ type: Types.CLOSE })
}
