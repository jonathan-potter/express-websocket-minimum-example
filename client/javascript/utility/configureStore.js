import { loadState, saveState } from 'utility/localStorage'
import rootReducer from 'reducers'

import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import throttle from 'lodash/throttle'
import thunk from 'redux-thunk'

const CURRENT_VERSION = '0.0.1'

export default function configureStore () {
  const middlewares = [thunk, createLogger()]

  const initialState = loadState()

  let version
  if (initialState && initialState.version) {
    version = initialState.version
    delete initialState['version']
  }

  let store
  if (version && version >= CURRENT_VERSION) {
    store = createStore(rootReducer, initialState, applyMiddleware(...middlewares))
  } else {
    store = createStore(rootReducer, applyMiddleware(...middlewares))
  }

  // store.subscribe(throttle(() => {
  //   const state = store.getState()
  //
  //   saveState({
  //     version: CURRENT_VERSION
  //   })
  // }, 1000))

  return store
}
