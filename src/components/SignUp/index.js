import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUpPage = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState("");
  const isInvalid = passwordOne === "" || email === "" || passwordOne !== passwordTwo;

  const clearFields = () => {
    setUsername("");
    setEmail("");
    setPasswordOne("");
    setPasswordTwo("");
    setError("");
  };

  const onSubmit = event => {
    props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        return props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email
          });
      })
      .then(() => {
        clearFields();
        props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        setError(error);
      });
    event.preventDefault();
  };

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };
  const handlePasswordOneChange = event => {
    setPasswordOne(event.target.value);
  };
  const handlePasswordTwoChange = event => {
    setPasswordTwo(event.target.value);
  };
  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  return (
    <div>
      <h1>SignUp</h1>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          value={username}
          onChange={handleUsernameChange}
          type="text"
          placeholder="Full Name" /><br />
        <input
          name="email"
          value={email}
          onChange={handleEmailChange}
          type="text"
          placeholder="email" /><br />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={handlePasswordOneChange}
          type="password"
          placeholder="Password" /><br />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={handlePasswordTwoChange}
          type="password"
          placeholder="Password Confirm" /><br />
        <button disabled={isInvalid} type="submit">Sign Up</button>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
};

export default compose(withRouter, withFirebase)(SignUpPage);