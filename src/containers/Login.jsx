import React from 'react';
import auth from '../config/Auth';

const Login = () => {
  return (
    <div>
      {auth.authorize()}
    </div>
  );
};

export default Login;
