import React, { useState } from 'react';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordChangePage = (props) => {

  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState("");

  const clearFields = () => {
    setPasswordOne("");
    setPasswordTwo("");
    setError("");
  };

  const onSubmit = event => {
    props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        clearFields();
        props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        setError(error);
      });

    event.preventDefault();
  };
  const handlePasswordOneChange = event => {
    setPasswordOne(event.target.value);
  };

  const handlePasswordTwoChange = event => {
    setPasswordTwo(event.target.value);
  };

  const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

  return (
    <form onSubmit={onSubmit}>
      <input name="passwordOne"
        value={passwordOne}
        onChange={handlePasswordOneChange}
        type="password"
        placeholder="New Password"
      />
      <input name="passwordTwo"
        value={passwordTwo}
        onChange={handlePasswordTwoChange}
        type="password"
        placeholder="New Password Confirm"
      />
      <button disabled={isInvalid} type='submit'>
        Change My Password
      </button>
      {error && <p>{error.messages}</p>}
    </form>
  );
};

export default withFirebase(PasswordChangePage);