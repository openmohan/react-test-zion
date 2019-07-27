import unsplash from './unsplash';
import store from '../createStore';
import { REQUEST_PHOTOS, RECEIVE_PHOTOS, ADD_USER_DATA } from './constants';

export const requestPhotos = () => ({
  type: REQUEST_PHOTOS,
});

export const receivedPhotos = json => ({
  type: RECEIVE_PHOTOS,
  json,
});
export const addUserdata = (name, json) => ({
  type: ADD_USER_DATA,
  data: { name, json },
});


export function fetchPhotos(name) {
  if (store.getState().receivedUsers[name]) {
    return (dispatch) => {
      dispatch(receivedPhotos(store.getState().receivedUsers[name]));
    };
  }
  return function (dispatch) {
    dispatch(requestPhotos());
    // TODO: make pagination
    return unsplash.users.photos(name, 1, 100, 'popular', false)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error),
      )
      .then((json) => {
        dispatch(receivedPhotos(json));
        dispatch(addUserdata(name, json));
      });
  };
}
