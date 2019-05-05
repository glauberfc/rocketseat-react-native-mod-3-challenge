import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './ducks'
import rootSaga from './sagas'

const sagaMonitor = console.tron.createSagaMonitor()
const sagaMiddleware = createSagaMiddleware({ sagaMonitor })

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    __DEV__ && console.tron.createEnhancer()
  )
)

sagaMiddleware.run(rootSaga)

export default store
