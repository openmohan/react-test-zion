import { REQUEST_PHOTOS, RECEIVE_PHOTOS, ADD_USER_DATA } from '../actions/constants';

const reducer = (state = { photos: [], receivedUsers: {} }, action) => {
  switch (action.type) {
    case REQUEST_PHOTOS:
      return { ...state, loading: true };
    case RECEIVE_PHOTOS:
      return {
        ...state, photos: action.json, loading: false,
      };
    case ADD_USER_DATA: {
      return {
        ...state, receivedUsers: { ...state.receivedUsers, [action.data.name]: action.data.json },
      };
    }
    default:
      return state;
  }
};
export default reducer;
