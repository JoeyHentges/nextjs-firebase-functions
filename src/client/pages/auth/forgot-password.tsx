import React from 'react';
import { Helmet } from 'react-helmet';

import ForgotPassword from '../../src/routes/auth/ForgotPassword';
import { IsUserRedirect } from '../../src/utils';
import * as ROUTES from '../../src/constants/routes';

function SignInPage() {
  return (
    <IsUserRedirect loggedInPath={ROUTES.HOME}>
      <Helmet title="Forgot Password" />
      <ForgotPassword />
    </IsUserRedirect>
  );
}

export default SignInPage;
