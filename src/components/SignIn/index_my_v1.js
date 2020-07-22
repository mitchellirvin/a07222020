import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

// new
import { useState } from 'react';

const SignInPage = ({ setUsername }) =>
  <div>
    <h1>SignIn</h1>
    <SignInForm setUsername={setUsername} />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
  ;

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

// old
// class SignInFormBase extends Component {
function SignInFormBase() {

  //new
  const [login, setLogin] = useState(INITIAL_STATE);

  // constructor(props) {
  //   super(props);
  //   console.log(props);
  //   this.state = { ...INITIAL_STATE };
  // }
  function onSubmit(event) {
    const { email, password } = login;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setLogin({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        setLogin({ error });
      });
    event.preventDefault();
  };

  function onChange(event) {
    setLogin({ [event.target.name]: event.target.value });
  };

  const { email, password, error } = login;
  const isInvalid = password === '' || email === '';

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={email}
        onChange={onChange}
        type="text"
        placeholder="Email Address" /><br />
      <input
        name="password"
        value={password}
        onChange={onChange}
        type="password"
        placeholder="Password" /><br />
      <button disabled={isInvalid} type="submit">Sign In</button>
      {error && <p>{error.message}</p>}
    </form>
  );
}
const SignInForm = compose(
  withRouter,
  withFirebase)(SignInFormBase);

export default SignInPage;
export { SignInForm };