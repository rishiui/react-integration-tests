import {
  LOAD_PEOPLE,
  LOAD_PEOPLE_SUCCESS,
  LOAD_PEOPLE_ERROR,
} from './constants';

export function loadPeople() {
  return {
    type: LOAD_PEOPLE,
  };
}

export function peopleLoaded(data) {
  return {
    type: LOAD_PEOPLE_SUCCESS,
    data,
  };
}

export function peopleError(error) {
  return {
    type: LOAD_PEOPLE_ERROR,
    error,
  };
}
