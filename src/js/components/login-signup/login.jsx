import React, { useState } from 'react';
import Label from './label.jsx';
//import Signup from './signup.jsx';

const Login = ({ setLogin }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica de inicio de sesión
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const regex = /^[a-zA-Z0-9._%+-]+@(correo\.unimet\.edu\.ve|unimet\.edu\.ve)$/;

    if (value === "") {
      setEmailError("");
    } else if (regex.test(value)) {
      setEmailError("");
    } else {
      setEmailError("El correo electrónico debe ser @correo.unimet.edu.ve o @unimet.edu.ve.");
    }
  };

  return (
    <div className='bg-[#96A89C] min-h-screen flex flex-col items-center justify-center pb-32'>
      <form onSubmit={handleLogin} className="max-w-5xl mx-auto pt-10 px-10 lg:px-0">
        <div className="border-b border-[#143A27] pb-5">
          <h2 className="text-5xl text-[#143A27] font-semibold font-serif roboto-subtitulos text-center">
            Iniciar sesión en UnimeTours
          </h2>
        </div>
        <div className="border-b border[#143A27]/20 pb-5">
          <div className="mt-5 grid grid-cols-1 gap-y-6">
            <div>
              <Label title="Email" htmlFor="email" />
              <input
                type="email"
                name="email"
                placeholder="uni.correo@correo.unimet.edu.ve"
                className="block w-full rounded-[20px] border border-white py-0.5 text-black shadow-sm outline-white sm:text-sm sm-leading-6 px-4"
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>
            <div>
              <Label title="Contraseña" htmlFor="contraseña" />
              <input
                type="password"
                name="contraseña"
                placeholder="Ingrese su contraseña"
                className="block w-full rounded-[20px] border border-white py-0.5 text-black shadow-sm outline-white sm:text-sm sm-leading-6 px-4"
              />
            </div>
          </div>
          <p className="mt-5 bg-white/60 text-red-600 text-center py-1 rounded-md tracking-wide font-semibold">Mensaje error</p>
          <button type="submit" className="mt-5 bg-[#143A27] w-full py-2 uppercase text-base font-bold tracking-wide rounded-md text-[#D4D9D8] hover:text-white hover:bg-[#02321A] duration-200">Iniciar sesión</button>
        </div>
      </form>
      <p className="text-sm leading-6 text-[#4B6C64] text-center py-6">¿Aún no tienes una cuenta creada? <button onClick={() => setLogin(false)} className="text-[#143A27] font-semibold underline underline-offset-2 decoration-[1px] hover:text-white duration-200">Registrarse</button></p>
    </div>
  );
};

export default Login;
