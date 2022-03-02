import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectPerson = state => state.person || initialState;

const makeSelectPerson = () =>
  createSelector(
    selectPerson,
    person => person,
  );

export { makeSelectPerson };
