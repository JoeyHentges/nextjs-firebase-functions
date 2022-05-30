import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import * as ROUTES from '../../constants/routes';
import { signIn } from '../../redux/actions';

const SignIn = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { authError } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signIn({ email, password }));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="white">
        <h5 className="grey-text text-darken-3">Sign In</h5>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={({ target }) => setEmail(target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <div>
          <button type="submit">Login</button>
          <div style={{ color: 'red' }}>{authError || ''}</div>
        </div>
      </form>
      <a href={ROUTES.FORGOT_PASSWORD}>Forgot Password</a>
      <br />
      <a href={ROUTES.SIGN_UP}>Register</a>
    </>
  );
};

const mapStateToProps = (state) => ({
  authError: state.user.error,
});

export default connect(mapStateToProps, null)(SignIn);
