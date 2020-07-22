import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';

const PasswordForgetPage = (props) => {

  const [ email, setEmail ] = useState("");
  const [ error, setError ] = useState("");

  const isInvalid = email === "";

  const clearFields = () => {
    setEmail("");
    setError("");
  };

  const onSubmit = event => {
    props.firebase
      .doPasswordReset(email)
      .then(() => {
        clearFields();
        props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        setError( error );
      });
    event.preventDefault();
  };

  const handleEmailChange = event => {
    setEmail( event.target.value );
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          value={email}
          onChange={handleEmailChange}
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Reset my password
        </button>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
};

export default compose(withRouter, withFirebase)(PasswordForgetPage);