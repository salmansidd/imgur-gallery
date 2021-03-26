import {
  GET_INITIAL_GALLERIES,
  GET_NEXT_GALLERIES,
  ON_CHANGE_FILTER,
} from './types';

export const getInitialGalleries = (payload) => {
  return {
    type: GET_INITIAL_GALLERIES,
    payload
  };
};

export const getNextGalleries = (payload) => {
  return {
    type: GET_NEXT_GALLERIES,
    payload
  };
};

export const onChangeFilter = (params) => {
  return {
    type: ON_CHANGE_FILTER,
    payload: { params }
  };
};


