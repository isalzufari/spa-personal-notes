import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../utils/api-data';
import RegisterInput from '../components/RegisterInput';

function RegisterPage() {
  const navigate = useNavigate();

  async function onRegisterHandler(user) {
    console.log(user);
    const { error } = await register(user);

    if (!error) {
      navigate('/');
    }
  }

  return (
    <section className='register-page'>
      <h2>Isi form untuk mendaftarkan akun.</h2>
      <RegisterInput register={onRegisterHandler} />
      <p>Sudah punya akun? <Link to="/">Login di sini</Link></p>
    </section>
  )
}

export default RegisterPage;