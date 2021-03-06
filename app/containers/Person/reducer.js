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
  LOAD_PERSON_SUCCESS,
  LOAD_PERSON,
  LOAD_PERSON_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  personDetails: {},
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_PERSON:
        draft.loading = true;
        draft.error = false;
        draft.personDetails = {};
        break;

      case LOAD_PERSON_SUCCESS:
        draft.personDetails = action.data;
        draft.loading = false;
        break;

      case LOAD_PERSON_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default appReducer;
