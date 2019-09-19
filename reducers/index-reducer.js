import produce from 'immer'

import { INIT_LOAD } from '../actions'

const initialState = { initialData: 'hello world' }

function reducer(draft, { type, payload }) {
  switch (type) {
    case INIT_LOAD:
      draft.loadedData = payload.data
      return
  }
}

export default produce(reducer, initialState)
