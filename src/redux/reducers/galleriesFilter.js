import { ON_CHANGE_FILTER } from 'redux/actions/types';

export const galleriesFilter = (
  state = {
    page: '0',
    section: 'hot',
    sort: 'viral',
    window: 'day'
  },
  action
) => {
  switch (action.type) {
    case ON_CHANGE_FILTER:
      return Object.assign({}, state, action.payload.params);
    default:
      return state;
  }
}
