//registarse

import React, { useState } from 'react';
import Login from './login.jsx';
import Label from './label.jsx';

const Signup = () => {
  const [login, setLogin] = useState(false);
  const [telefono, setTelefono] = useState('+58');
  const [telefonoError, setTelefonoError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSignup = () => {};

  const handleTelefonoChange = (e) => {
    const value = e.target.value;
    setTelefono(value);

    const regex = /^\+58(414|412|424|212|416|426)\d{0,7}$/;

    if (regex.test(value)) {
        setTelefonoError('');
        if (value.length === 13) {
          setTelefonoError('');
        } else {
          setTelefonoError('El número de teléfono debe tener 10 dígitos después de +58.');
        }
      } else if (value === '+58') {
        setTelefonoError('');
      } else {
        setTelefonoError('El número de teléfono debe comenzar con +58 seguido de 414, 412, 424, 212, 416, o 426 y contener solo números.');
      }
    };
  
    const handleEmailChange = (e) => {
      const value = e.target.value;
      setEmail(value);
  
      const regex = /^[a-zA-Z0-9._%+-]+@(correo\.unimet\.edu\.ve|unimet\.edu\.ve)$/;
      
      if (value === '') {
        setEmailError('');
      } else if (regex.test(value)) {
        setEmailError('');
      } else {
        setEmailError('El correo electrónico debe ser @correo.unimet.edu.ve o @unimet.edu.ve.');
      }
    };
  return (
    <div className='bg-[#96A89C] min-h-screen flex items-center justify-center'>
      {login ? (
        <Login />
      ) : (
        <form onSubmit={handleSignup} className="max-w-5xl mx-auto pt-10 px-10 lg:px-0">
          <div className='border-b border-[#143A27] pb-5'>
            <h2 className="text-5xl text-[#143A27] font-semibold font-serif roboto-subtitulos text-center">Registrarte en UnimeTours</h2>
            
          </div>
          <div className='border-b border[#143A27]/20 pb-5'>
            <div className='mt-5 grid grid-cols-1 gap-y-6'>
                <div>
                    <Label title="Nombre" htmlFor="nombre"/>
                    <input type="text" name="nombre" placeholder='Tu nombre' className="block w-full rounded-md border border-white py-0.5 text-black rounded-[20px] shadow-sm outline-white sm:text-sm sm-leading-6 px-4"/>
                </div>
                <div>
                    <Label title="Apellido" htmlFor="apellido"/>
                    <input type="text" name="apellido" placeholder='Tu apellido' className="block w-full rounded-md border border-white py-0.5 text-black rounded-[20px] shadow-sm outline-white sm:text-sm sm-leading-6 px-4"/>
                </div>
                <div>
                    <Label title="Teléfono celular" htmlFor="telefono"/>
                    <input type="text" 
                    name="telefono" 
                    placeholder='+584148425456' 
                    className="block w-full rounded-md border border-white py-0.5 text-black rounded-[20px] shadow-sm outline-white sm:text-sm sm-leading-6 px-4" 
                    value={telefono} 
                    onChange={handleTelefonoChange}/>
                    {telefonoError && <p className="text-red-500 text-sm mt-1">{telefonoError}</p>}
                </div>
                <div>
                    <Label title="Email" htmlFor="email"/>
                    <input 
                    type="text" 
                    name="email" 
                    placeholder='uni.correo@correo.unimet.edu.ve' 
                    className="block w-full rounded-md border border-white py-0.5 text-black rounded-[20px] shadow-sm outline-white sm:text-sm sm-leading-6 px-4"
                    value={email}
                    onChange={handleEmailChange}
                    />
                    {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                </div>
                <div>
                    <Label title="Contraseña" htmlFor="contraseña"/>
                    <input type="text" name="contraseña" placeholder='Ingrese su contraseña' className="block w-full rounded-md border border-white py-0.5 text-black rounded-[20px] shadow-sm outline-white sm:text-sm sm-leading-6 px-4"/>
                </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Signup;