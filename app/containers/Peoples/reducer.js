/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  LOAD_PEOPLE_SUCCESS,
  LOAD_PEOPLE,
  LOAD_PEOPLE_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  peoples: [],
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_PEOPLE:
        draft.loading = true;
        draft.error = false;
        draft.peoples = [];
        break;

      case LOAD_PEOPLE_SUCCESS:
        draft.peoples = action.data.results;
        draft.loading = false;
        break;

      case LOAD_PEOPLE_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default appReducer;
