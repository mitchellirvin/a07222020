import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import { useContext } from 'react';
import { UserContext } from '../UserProvder';

import * as ROUTES from '../../constants/routes';

export default function Navigation() {
  const user = useContext(UserContext);
  return (
    <div style={{ paddingTop: '1em', paddingLeft: '1em', height: '1em' }}>
      {!user ?
        <> <Link to={ROUTES.SIGN_IN}>Sign In</Link> | <Link to={ROUTES.SIGN_UP}>Sign Up</Link> </>
        :
        <>
          <Link to={ROUTES.LANDING}>Landing</Link> |&nbsp;
          <Link to={ROUTES.HOME}>Home</Link> |&nbsp;
          <Link to={ROUTES.ACCOUNT}>Account</Link> |&nbsp;
          <Link to={ROUTES.ADMIN}>Admin</Link>&nbsp;&nbsp;
          { user.email }&nbsp;
          <SignOutButton />
          <span style={{textAlign: "center" }}>-TITLE-</span>
        </>
      }
    </div>
  );
}