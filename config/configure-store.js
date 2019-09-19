import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import rootReducer from '../reducers'

const bindMiddleware = middleware => {
  if (process.env.STAGING !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

export default function configureStore(initialState = {}) {
  return createStore(rootReducer, initialState, bindMiddleware([thunkMiddleware]))
}
