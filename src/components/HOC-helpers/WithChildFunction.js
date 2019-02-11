import React from 'react';
const WithChildFunction = (fn) => (Wrapped) => {
  return (props) => <Wrapped {...props}>{fn}</Wrapped>;
};

export default WithChildFunction;
