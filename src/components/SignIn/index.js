import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { Link } from 'react-router-dom';
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const SignInPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid = password === "" || email === "";
  const clearFields = () => {
    setEmail("");
    setPassword("");
    setError("");
  };
  const onSubmit = (event) => {
    props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        clearFields();
        props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        setError(error);
      });
    event.preventDefault();
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const SignUpLink = () => {
    return (
      <p>
        Don't have an account?
        <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
      </p>
    );
  };
  const PasswordForgetLink = () => {
    return (
      <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password</Link>
      </p>
    );
  };

  return (
    <div>
      <h1>SignIn</h1>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          value={email}
          onChange={handleEmailChange}
          type="text"
          placeholder="Email Address"
        />
        <br />
        <input
          name="password"
          value={password}
          onChange={handlePasswordChange}
          type="password"
          placeholder="Password"
        />
        <br />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>
        {error && <p>{error.message}</p>}
      </form>
      <PasswordForgetLink />
      <SignUpLink />
    </div>
  );
};

export default compose(withRouter, withFirebase)(SignInPage);