import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectPeople = state => state.people || initialState;

const makeSelectPeople = () =>
  createSelector(
    selectPeople,
    people => people,
  );

export { makeSelectPeople };
