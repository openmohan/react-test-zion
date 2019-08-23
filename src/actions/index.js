import unsplash from './unsplash';
import store from '../createStore';
import {
  REQUEST_PHOTOS, RECEIVE_PHOTOS,
  ADD_USER_DATA, ADD_USER_PHOTO_DATA,
  ADD_USER_PAGE_DATA, IS_LOADING,
} from './constants';

export const requestPhotos = name => ({
  type: REQUEST_PHOTOS,
  data: { currentUser: name },
});

export const loadingToggle = isLoading => ({
  type: IS_LOADING,
  data: isLoading,
});

function transformPhotoData(jsonPhotos) {
  const { photos } = store.getState();
  const keys = Object.keys(jsonPhotos);
  keys.forEach((key) => {
    photos.push(jsonPhotos[key]);
  });
  return photos;
}

function transformAndAddPhotoData(jsonPhotos) {
  const state = store.getState();
  const { currentUser } = state.app;
  const user = JSON.parse(JSON.stringify(state.users[currentUser]));
  const keys = Object.keys(jsonPhotos);

  keys.forEach((key) => {
    user.photos.push(jsonPhotos[key]);
  });

  return user.photos;
}

function cleanAndransformPhotoData(jsonPhotos) {
  const photos = [];
  const keys = Object.keys(jsonPhotos);
  keys.forEach((key) => {
    photos.push(jsonPhotos[key]);
  });
  return photos;
}

export const receivedPhotos = json => ({
  type: RECEIVE_PHOTOS,
  json: transformPhotoData(json),
});

export const cleanAndAddReceivedPhotos = json => ({
  type: RECEIVE_PHOTOS,
  json: cleanAndransformPhotoData(json),
});

export const addUserdata = (name, json) => ({
  type: ADD_USER_DATA,
  data: { name, json: { data: (json.data), currentPage: json.currentPage } },
});

export const addUserPhotoData = (name, currentPage, photos) => ({
  type: ADD_USER_PHOTO_DATA,
  data: { name, currentPage, photos },
});

const pageNumberChange = (name, currentPage) => ({
  type: ADD_USER_PAGE_DATA,
  data: { name, currentPage },
});


export function fetchPhotos(name) {
  if (store.getState().receivedUsers[name]) {
    return (dispatch) => {
      dispatch(loadingToggle(true));
      dispatch(requestPhotos(name));
      dispatch(cleanAndAddReceivedPhotos(store.getState().receivedUsers[name].data));
      dispatch(loadingToggle(false));
    };
  }
  return async function receivePhotos(dispatch) {
    // TODO: make pagination
    try {
      dispatch(loadingToggle(true));
      const response = await unsplash.users.photos(name, 1, 10, 'popular', false);
      const jsonP = await response;
      const json = await jsonP.json();
      if (json != null && !json.errors) {
        dispatch(requestPhotos(name));
        dispatch(cleanAndAddReceivedPhotos(json));
        dispatch(addUserdata(name, { data: json, currentPage: 1 }));
        dispatch(addUserPhotoData(name, 1, cleanAndransformPhotoData(json)));
        dispatch(loadingToggle(false));
      }
    } catch (e) {
      throw e;
    }

    return null;
  };
}


export function fetchNextPhotos() {
  const name = store.getState().app.currentUser;
  return (dispatch) => {
    dispatch(loadingToggle(true));
    const pageNumber = store.getState().users[name].currentPage;
    const newPageNumber = pageNumber + 1;
    return unsplash.users.photos(name, newPageNumber, 10, 'popular', false)
      .then(
        response => response.json(),
        () => null,
      )
      .then((json) => {
        if (json != null) {
          dispatch(receivedPhotos(json));
          dispatch(pageNumberChange(name, newPageNumber));
          dispatch(addUserPhotoData(name, newPageNumber, transformAndAddPhotoData(json)));
          dispatch(loadingToggle(false));
          // dispatch(addUserdata(name,
          //   {
          //     data: { ...store.getState().receivedUsers[name].data, ...json },
          //     currentPage: store.getState().receivedUsers[name].currentPage + 1,
          //   }));
        }
      });
  };
}
