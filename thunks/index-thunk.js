import { initLoad } from '../actions'

export const initLoadThunk = (params = {}) => async (dispatch, getState) => {
  // async operation
  // const data = await axios.get('/api', { params })
  const payload = { data: 'yoO loaded~' }

  dispatch(initLoad(payload))
}
