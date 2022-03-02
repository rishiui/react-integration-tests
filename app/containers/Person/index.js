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
import { makeSelectPerson } from './selector';
import reducer from './reducer';
import saga from './saga';
import * as personActions from './actions';

import PersonDetails from '../../components/PersonDetails';

export function Person(props) {
  const { person, actions } = props;
  const { personDetails, error, loading } = person;
  const { id } = props.match.params;
  // eslint-disable-next-line no-console
  console.log('person...');

  React.useEffect(() => {
    actions.loadPerson(id);
  }, []);

  if (loading) {
    return <div>Loading Person...</div>;
  }
  if (error) {
    return <div>Something went wrong...</div>;
  }
  return <PersonDetails personDetails={personDetails} />;
}

const mapStateToProps = createStructuredSelector({
  person: makeSelectPerson(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(personActions, dispatch),
  };
}

Person.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }),
  person: PropTypes.object,
  actions: PropTypes.any,
};
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({
  key: 'person',
  reducer,
});
const withSaga = injectSaga({
  key: 'person',
  saga,
});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Person);
