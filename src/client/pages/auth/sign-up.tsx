import React from 'react';
import { Helmet } from 'react-helmet';

import SignUp from '../../src/routes/auth/SignUp';
import { IsUserRedirect } from '../../src/utils';
import * as ROUTES from '../../src/constants/routes';

function SignUpPage() {
  return (
    <IsUserRedirect loggedInPath={ROUTES.HOME}>
      <Helmet title="Sign Up" />
      <SignUp />
    </IsUserRedirect>
  );
}

export default SignUpPage;
