import React from 'react';
import PasswordForgetForm from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

export default function index() {
  return (
    <div>
      <h1>Account Page</h1>
      Password Reset
      <PasswordForgetForm />
      <br />
      Password Change
      <PasswordChangeForm />
    </div>
  );
}
