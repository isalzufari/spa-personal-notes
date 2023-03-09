import React from 'react';
import useInput from '../hooks/useInput';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  function onLoginHandler(e) {
    e.preventDefault();

    if (email === '' || password === '') {
      alert('Box masih kosong!');
    }

    login({
      email,
      password
    });
  }

  return (
    <form onSubmit={onLoginHandler} className="input-login">
      <label htmlFor="email">Email</label>
      <input type="email" id="email" value={email} onChange={onEmailChange} />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" value={password} onChange={onPasswordChange} />
      <button>Login</button>
    </form>
  )
}

export default LoginInput;