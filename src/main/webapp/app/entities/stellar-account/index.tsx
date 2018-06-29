import * as React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import StellarAccount from './stellar-account';
import StellarAccountDetail from './stellar-account-detail';
import StellarAccountUpdate from './stellar-account-update';
import StellarAccountDeleteDialog from './stellar-account-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={StellarAccountUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={StellarAccountUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={StellarAccountDetail} />
      <ErrorBoundaryRoute path={match.url} component={StellarAccount} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={StellarAccountDeleteDialog} />
  </>
);

export default Routes;
