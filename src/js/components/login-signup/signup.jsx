//registarse

import React, { useState } from 'react';
import Login from './login.jsx';

const Signup = () => {
  const [login, setLogin] = useState(false);
  const handleSignup = () => {};
  return (
    <div className='bg-[#96A89C]'>
      {login ? (
        <Login />
      ) : (
        <form onSubmit={handleSignup} className="max-w-5xl mx-auto pt-10 px-10 lg:px-0">
          <div className='border-b border-[#143A27] pb-5'>
            <h2 className="text-7xl text-[#143A27] font-bold font-serif montserrat text-center">Registrarse</h2>
            <p className='font-light font-serif roboto-parrafos px-15 text-center pt-7'>Completa la información para registrarte en UnimeTours. De esta manera podrás reservar rutas.</p>
          </div>
          <div></div>
        </form>
      )}
    </div>
  );
};

export default Signup;