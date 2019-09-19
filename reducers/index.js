import { combineReducers } from 'redux'

import indexReducer from './index-reducer'

export default combineReducers({
  index: indexReducer
})
