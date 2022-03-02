import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { StyledPersonDetails } from './styles';

const PersonDetails = ({ personDetails }) => {
  if (isEmpty(personDetails)) return <div>Person Details Not found</div>;
  return (
    <StyledPersonDetails>
      <h1>Person Details are:</h1>
      <div className="person-details">
        <div>{`Name: ${personDetails.name}`}</div>
        <div>{`Birth Year: ${personDetails.birth_year}`}</div>
        <div>{`Eye Color: ${personDetails.eye_color}`}</div>
        <div>{`Gender: ${personDetails.gender}`}</div>
        <div>{`Hair Color: ${personDetails.hair_color}`}</div>
        <div>{`Height: ${personDetails.height}`}</div>
        <div>{`Mass: ${personDetails.mass}`}</div>
        <div>{`No of films: ${personDetails.films.length}`}</div>
        <div>{`No of starships: ${personDetails.starships.length}`}</div>
        <div>{`No of vehicles: ${personDetails.vehicles.length}`}</div>
      </div>
    </StyledPersonDetails>
  );
};

PersonDetails.propTypes = {
  personDetails: PropTypes.object,
};

export default PersonDetails;
