import React from 'react';
import { Redirect } from 'react-router-dom';

const LoginPage = ({ isLoggedIn, onLogin }) => {
  if (isLoggedIn) {
    return <Redirect to="/secret" />;
  }
  return (
    <div className="jumbotron">
      <p>Login to the secret page!</p>
      <buttton className="btn btn-primary" onClick={onLogin}>
        Login
      </buttton>
    </div>
  );
};

export default LoginPage;
