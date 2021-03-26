import { combineReducers } from 'redux';
import { galleriesList }  from './galleriesList';
import { galleriesFilter } from './galleriesFilter';

const rootReducer = combineReducers({
  galleriesList,
  galleriesFilter
});

export default rootReducer;
