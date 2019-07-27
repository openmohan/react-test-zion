import unsplash from './unsplash';

export const SELECT_CHANNEL = 'SELECT_CHANNEL';
export const REQUEST_PHOTOS = 'REQUEST_PHOTOS';
export const RECEIVE_PHOTOS = 'RECEIVE_PHOTOS';

export const getChannel = channel => ({
  type: SELECT_CHANNEL,
  channel,
});

export const requestPhotos = () => ({
  type: REQUEST_PHOTOS,
});

export const receivedPhotos = json => ({
  type: RECEIVE_PHOTOS,
  json: json.articles,
});

export function fetchPhotos(name) {
  return function (dispatch) {
    console.log(name);
    dispatch(requestPhotos());
    return unsplash.users.photos('naoufal', 1, 10, 'popular', false)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error),
      )
      .then((json) => {
        console.log(json);
        dispatch(receivedPhotos(json));
      });
  };
}
