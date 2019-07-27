import {
  REQUEST_PHOTOS, RECEIVE_PHOTOS, ADD_USER_DATA,
  ADD_USER_PHOTO_DATA, ADD_USER_PAGE_DATA, IS_LOADING,
} from '../actions/constants';

const reducer = (state = {
  photos: [], users: {}, receivedUsers: {}, currentUser: '', app: { currentUser: '', loading: false },
}, action) => {
  switch (action.type) {
    case REQUEST_PHOTOS:
      return { ...state, loading: true, app: { currentUser: action.data.currentUser } };
    case RECEIVE_PHOTOS:
      return {
        ...state, test: action.json, photos: action.json, loading: false,
      };
    case ADD_USER_DATA: {
      return {
        ...state, receivedUsers: { ...state.receivedUsers, [action.data.name]: action.data.json },
      };
    }
    case ADD_USER_PHOTO_DATA: {
      const currentUser = action.data.name;
      const userInfo = Object.assign({}, state.users);
      if (!userInfo[currentUser]) {
        userInfo[currentUser] = {};
      }
      userInfo[currentUser].photos = action.data.photos;
      userInfo[currentUser].currentPage = action.data.currentPage;
      return Object.assign({}, state, { users: userInfo });
    }
    case ADD_USER_PAGE_DATA: {
      const currentUser = action.data.name;
      const userInfo = Object.assign({}, state.users);
      if (!userInfo[currentUser]) {
        userInfo[currentUser] = {};
      }
      userInfo[currentUser].currentPage = action.data.currentPage;
      return Object.assign({},
        state, { users: userInfo });
    }
    case IS_LOADING: {
      const appState = Object.assign({}, state.app);
      appState.loading = action.data;
      return Object.assign({}, state, { app: appState });
    }
    default:
      return state;
  }
};
export default reducer;
