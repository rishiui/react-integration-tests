/*
 * People
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectPeople } from './selector';
import reducer from './reducer';
import saga from './saga';
import * as peopleActions from './actions';

import PeopleList from '../../components/PeopleList';

export function People({ people, actions }) {
  const { peoples, error, loading } = people;
  React.useEffect(() => {
    actions.loadPeople();
  }, []);

  if (loading) {
    return <div>Loading People...</div>;
  }
  if (error) {
    return <div>Something went wrong...</div>;
  }
  if (!peoples.length) {
    return <div>No people found.</div>;
  }
  return <PeopleList peopleList={peoples} />;
}

People.propTypes = {
  people: PropTypes.object,
  actions: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  people: makeSelectPeople(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(peopleActions, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({
  key: 'people',
  reducer,
});
const withSaga = injectSaga({
  key: 'people',
  saga,
});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(People);
