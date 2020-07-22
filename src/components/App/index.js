import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import UserProvider from '../UserProvder';

import * as ROUTES from '../../constants/routes';

export default function App() {
  return (
    <Router>
      <div>
        <UserProvider>
          <Navigation />
        </UserProvider>
        <center><h2>FoodList</h2></center>
        <hr />
        <Route exact path={ROUTES.LANDING}>
          <LandingPage/>
        </Route> 
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
      </div>
    </Router>
  );
}