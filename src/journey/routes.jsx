import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as Navigate from '../constants/routes-constant';
import QuotesContainer from '../container/quotes-container';
import FinanceHouseContainer from '../container/finance-house-container';
import FormContainer from '../container/form-container';


const Routes = props => (
  <Switch>  
    <Route
      exact
      path={Navigate.ROOT}
      render={routeProps => <FinanceHouseContainer {...routeProps} />}
    />
    <Route
      exact
      path={Navigate.TO_HOME}
      render={routeProps => <FinanceHouseContainer {...routeProps} />}
    />
    <Route
      exact
      path={Navigate.TO_QUOTES}
      render={routeProps => <QuotesContainer {...routeProps} />}
    />
    <Route
      exact
      path={Navigate.TO_FORM}
      render={routeProps => <FormContainer {...routeProps} />}
    />
  </Switch>
);

Routes.defaultProps = {
  loggedIn: false,
  searchComplete: false,
};

Routes.propTypes = {
  loggedIn: PropTypes.bool,
  searchComplete: PropTypes.bool,
};

export default Routes;