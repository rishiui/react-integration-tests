import { call, put, takeLatest, all } from 'redux-saga/effects';
import { personLoaded, personError } from './actions';
import * as api from '../../../server/api';
import * as types from './constants';

export function* getPerson(actions) {
  try {
    const personData = yield call(api.getPerson, actions.id);
    yield put(personLoaded(personData));
  } catch (err) {
    yield put(personError(err));
    throw new Error('Some error occurred while fetching person');
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* watchGetPerson() {
  yield takeLatest(types.LOAD_PERSON, getPerson);
}

export default function* personSaga() {
  yield all([watchGetPerson()]);
}
