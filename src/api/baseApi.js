import {BASE_URL, CLIENT_ID} from 'constants.js';
import {
  getInitialGalleries,
  getNextGalleries,
  onChangeFilter
} from 'redux/actions';

const handleResponse = (response) => {
  if (!response.ok) {
    throw response;
  } else {
    return Promise.resolve(response);
  }
}

export const getGalleries = ({ section, sort, window, page }) => (dispatch) => {
  const getUrl = `${BASE_URL}/${section}/${sort}/${window}/${page}?showViral=true`;
  fetch(getUrl, {
    method: 'GET',
    headers: {
      authorization: `Client-ID ${CLIENT_ID}`
    }
  })
    .then(handleResponse)
    .then(res => {
      res.json().then(result => {
        (page > 0)
          ? dispatch(getNextGalleries(result.data))
          : dispatch(getInitialGalleries(result.data))
      });
    })
};

export const changeFilter = (params) => (dispatch) => {
  dispatch(onChangeFilter(params));
};
