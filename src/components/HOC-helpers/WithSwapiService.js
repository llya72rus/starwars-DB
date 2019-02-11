import React from 'react';

import { SwapiServiceConsumer } from '../swapi-service-context';

const WithSwapiService = (mapMethodsToProps) => (WrappedComponent) => {
  return (props) => {
    return (
      <SwapiServiceConsumer>
        {(swapiService) => {
          const serviceProps = mapMethodsToProps(swapiService);
          return <WrappedComponent {...props} {...serviceProps} />;
        }}
      </SwapiServiceConsumer>
    );
  };
};

export default WithSwapiService;
