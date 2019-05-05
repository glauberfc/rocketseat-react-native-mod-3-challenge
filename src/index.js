import React from 'react'
import { Provider } from 'react-redux'
import styled from 'styled-components/native'

import '#/config/ReactotronConfig'
import store from '#/store'
import Map from '#/components/Map'
import Modal from '#/components/Modal'

const App = () => (
  <Provider store={store}>
    <Map />
    <Modal />
  </Provider>
)

export default App
