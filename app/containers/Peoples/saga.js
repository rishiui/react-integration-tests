import { call, put, takeLatest, all } from 'redux-saga/effects';
import { peopleLoaded, peopleError } from './actions';
import * as api from '../../../server/api';
import * as types from './constants';

export function* getPeople() {
  try {
    const peopleData = yield call(api.getAllPeople);
    yield put(peopleLoaded(peopleData));
  } catch (err) {
    yield put(peopleError(err));
    throw new Error('Some error occurred while fetching people');
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* watchGetPeople() {
  yield takeLatest(types.LOAD_PEOPLE, getPeople);
}

export default function* peopleSaga() {
  yield all([watchGetPeople()]);
}
