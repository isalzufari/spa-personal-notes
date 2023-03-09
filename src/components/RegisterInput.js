import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPassword] = useInput('');

  function onSubmitHandler(e) {
    e.preventDefault();

    if (name === '' || email === '' || password === '') {
      alert('Box masih kosong!');
    }

    if (password === confirmPassword) {
      register({
        name,
        email,
        password
      });
    } else {
      alert('Check the password again!')
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="input-register">
      <label htmlFor="name">Name</label>
      <input type="text" id="name" value={name} onChange={onNameChange} />
      <label htmlFor="email">Email</label>
      <input type="email" id="email" value={email} onChange={onEmailChange} />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" value={password} onChange={onPasswordChange} />
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input type="password" id="confirmPassword" value={confirmPassword} onChange={onConfirmPassword} />
      <button>Register</button>
    </form>
  )
}

export default RegisterInput;