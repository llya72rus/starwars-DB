import React from 'react';
import ItemDetails, { Record } from '../ItemDetails';
import { WithSwapiService } from '../HOC-helpers';

const StarshipDetails = (props) => {
  return (
    <ItemDetails {...props}>
      <Record field="gender" label="Gender" />
      <Record field="eyeColor" label="Eye Color" />
    </ItemDetails>
  );
};

const mapMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getStarship,
    getImageUrl: swapiService.getStarshipImage,
  };
};

export default WithSwapiService(mapMethodsToProps)(StarshipDetails);
