import { takeLatest, put, call } from 'redux-saga/effects'
import axios from 'axios'

import { Types as UsersTypes, Actions as UsersActions } from './ducks/users'
import { Actions as ModalActions } from './ducks/modal'

function* getUserData(action) {
  try {
    const { data } = yield call(
      axios.get,
      `https://api.github.com/users/${action.payload.username}`
    )

    const newUser = {
      id: data.id,
      name: data.name,
      avatar: data.avatar_url,
      bio: data.bio,
      latitude: action.payload.latitude,
      longitude: action.payload.longitude
    }

    yield put(UsersActions.addUserSuccess(newUser))
    yield put(ModalActions.closeModal())
  } catch (error) {
    yield put(UsersActions.addUserFailure('Error trying to request user data'))
  }
}

export default function*() {
  yield takeLatest(UsersTypes.REQUEST, getUserData)
}
