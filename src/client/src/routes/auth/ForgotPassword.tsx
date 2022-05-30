import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import * as ROUTES from '../../constants/routes';
import { forgotPassword } from '../../redux/actions';

const ForgotPassword = (props) => {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const { authError } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="white">
        <h5 className="grey-text text-darken-3">Sign In</h5>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={({ target }) => setEmail(target.value)} />
        </div>
        <div className="input-field">
          <button type="submit" className="btn pink lighten-1 z-depth-0">
            Send Request
          </button>
          <div className="red-text center">{authError || ''}</div>
        </div>
      </form>
      <a href={ROUTES.SIGN_IN}>Sign In</a>
    </>
  );
};

const mapStateToProps = (state) => ({
  authError: state.user.error,
});

export default connect(mapStateToProps, null)(ForgotPassword);
