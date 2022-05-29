import React from 'react';
import { Helmet } from 'react-helmet';

import Home from '../src/routes/Home';
import { ProtectedRoute } from '../src/utils';
import * as ROUTES from '../src/constants/routes';

const HomePage: React.FC = () => (
  <ProtectedRoute redirectPath={ROUTES.SIGN_IN}>
    <Helmet title="Home" />
    <Home />
  </ProtectedRoute>
);

export default HomePage;
