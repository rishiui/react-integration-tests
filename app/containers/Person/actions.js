import {
  LOAD_PERSON,
  LOAD_PERSON_SUCCESS,
  LOAD_PERSON_ERROR,
} from './constants';

export function loadPerson(id) {
  return {
    type: LOAD_PERSON,
    id,
  };
}

export function personLoaded(data) {
  return {
    type: LOAD_PERSON_SUCCESS,
    data,
  };
}

export function personError(error) {
  return {
    type: LOAD_PERSON_ERROR,
    error,
  };
}
