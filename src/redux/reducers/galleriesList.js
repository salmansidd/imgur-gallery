import { GET_INITIAL_GALLERIES, GET_NEXT_GALLERIES } from 'redux/actions/types';

export const galleriesList = (state = [], action) => {
  switch (action.type) {
    case GET_INITIAL_GALLERIES:
      return action.payload;
    case GET_NEXT_GALLERIES:
      return [...state, ...action.payload];
    default:
      return state;
  }
}
