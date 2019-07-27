import { SELECT_CHANNEL, REQUEST_PHOTOS, RECEIVE_PHOTOS } from '../actions';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_CHANNEL:
      return { ...state, channel: action.channel };
    case REQUEST_PHOTOS:
      return { ...state, loading: true };
    case RECEIVE_PHOTOS:
      return { ...state, json: action.json, loading: false };
    default:
      return state;
  }
};
export default reducer;
