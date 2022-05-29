import React from 'react';
import { Helmet } from 'react-helmet';

import SignIn from '../../src/routes/auth/SignIn';
import { IsUserRedirect } from '../../src/utils';
import * as ROUTES from '../../src/constants/routes';

function SignInPage() {
  return (
    <IsUserRedirect loggedInPath={ROUTES.HOME}>
      <Helmet title="Sign In" />
      <SignIn />
    </IsUserRedirect>
  );
}

export default SignInPage;
