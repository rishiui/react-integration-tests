import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { StyledPeopleList, StyledUserName } from './styles';

const PeopleList = ({ peopleList }) => (
  <StyledPeopleList>
    <h1>Peoples in Starwar:</h1>
    {peopleList.map((people, index) => {
      const peopleUrl = people.url.split('/');
      const peopleId = peopleUrl[peopleUrl.length - 2];
      return (
        <StyledUserName key={people.name}>
          <Link className="username" to={`/people/${peopleId}`}>
            {`${index + 1}${'. '}${people.name}`}
          </Link>
        </StyledUserName>
      );
    })}
  </StyledPeopleList>
);
PeopleList.propTypes = {
  peopleList: PropTypes.array,
};
export default PeopleList;
