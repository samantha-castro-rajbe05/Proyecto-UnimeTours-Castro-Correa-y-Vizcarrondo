//registarse

import React, { useState } from "react";
import Login from "./login.jsx";
import Label from "./label.jsx";
import { PhotoIcon } from "@heroicons/react/24/solid";

const Signup = () => {
  const [login, setLogin] = useState(false);
  const [telefono, setTelefono] = useState("+58");
  const [telefonoError, setTelefonoError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSignup = () => {};

  const handleAvatar = () => {};

  const handleTelefonoChange = (e) => {
    const value = e.target.value;
    setTelefono(value);

    const regex = /^\+58(414|412|424|212|416|426)\d{0,7}$/;

    if (regex.test(value)) {
      setTelefonoError("");
      if (value.length === 13) {
        setTelefonoError("");
      } else {
        setTelefonoError(
          "El número de teléfono debe tener 10 dígitos después de +58."
        );
      }
    } else if (value === "+58") {
      setTelefonoError("");
    } else {
      setTelefonoError(
        "El número de teléfono debe comenzar con +58 seguido de 414, 412, 424, 212, 416, o 426 y contener solo números."
      );
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const regex =
      /^[a-zA-Z0-9._%+-]+@(correo\.unimet\.edu\.ve|unimet\.edu\.ve)$/;

    if (value === "") {
      setEmailError("");
    } else if (regex.test(value)) {
      setEmailError("");
    } else {
      setEmailError(
        "El correo electrónico debe ser @correo.unimet.edu.ve o @unimet.edu.ve."
      );
    }
  };
  return (
    <div className="bg-[#96A89C] min-h-screen flex items-center justify-center pb-32">
      {login ? (
        <Login setLogin={setLogin} />
      ) : (
        <div>
          <form
          onSubmit={handleSignup}
          className="max-w-5xl mx-auto pt-10 px-10 lg:px-0"
        >
          <div className="border-b border-[#143A27] pb-5">
            <h2 className="text-5xl text-[#143A27] font-semibold font-serif roboto-subtitulos text-center">
              Registrarte en UnimeTours
            </h2>
          </div>
          <div className="border-b border[#143A27]/20 pb-5">
            <div className="mt-5 grid grid-cols-1 gap-y-6">
              <div>
                <Label title="Nombre" htmlFor="nombre" />
                <input
                  type="text"
                  name="nombre"
                  placeholder="Tu nombre"
                  className="block w-full rounded-md border border-white py-0.5 text-black rounded-[20px] shadow-sm outline-white sm:text-sm sm-leading-6 px-4"
                />
              </div>
              <div>
                <Label title="Apellido" htmlFor="apellido" />
                <input
                  type="text"
                  name="apellido"
                  placeholder="Tu apellido"
                  className="block w-full rounded-md border border-white py-0.5 text-black rounded-[20px] shadow-sm outline-white sm:text-sm sm-leading-6 px-4"
                />
              </div>
              <div>
                <Label title="Teléfono celular" htmlFor="telefono" />
                <input
                  type="text"
                  name="telefono"
                  placeholder="+584148425456"
                  className="block w-full rounded-md border border-white py-0.5 text-black rounded-[20px] shadow-sm outline-white sm:text-sm sm-leading-6 px-4"
                  value={telefono}
                  onChange={handleTelefonoChange}
                />
                {telefonoError && (
                  <p className="text-red-500 text-sm mt-1">{telefonoError}</p>
                )}
              </div>
              <div>
                <Label title="Email" htmlFor="email" />
                <input
                  type="email"
                  name="email"
                  placeholder="uni.correo@correo.unimet.edu.ve"
                  className="block w-full rounded-md border border-white py-0.5 text-black rounded-[20px] shadow-sm outline-white sm:text-sm sm-leading-6 px-4"
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
                  className="block w-full rounded-md border border-white py-0.5 text-black rounded-[20px] shadow-sm outline-white sm:text-sm sm-leading-6 px-4"
                />
                <div className="mt-2 flex items-center gap-x-3">
                  <div className="flex-1">
                    <Label title="Foto de perfil" className="mt-2" />
                    <div className="mt-1 flex items-center justify-center border border-dashed py-4 px-6 rounded-lg border-white">
                      <div className="text-center flex flex-col items-center">
                        <div className="w-14 h-14 border border-[#BDC2C1] rounded-full p-1">
                          <PhotoIcon
                            className="mx-auto h-full w-ful text-[#BDC2C1]"
                            area-hidden="true" 
                          />
                        </div>
                        <div className="mt-4 flex items-center mb-1 text-sm leading-6 text-center text-[#C8CDCA] ">
                          <label htmlFor="file-upload" className="relative cursor-pointer rounded-md px-2 py-1 bg-[#4B6C64] font-semibold outline-none ring-1 focus-within:ring-2 hover:bg-[#38534C]"><span>Subir una imagen</span>{""}
                          <input 
                          type="file"
                          name="file-upload" 
                          id="file-upload" 
                          className="sr-only" 
                          onChange={handleAvatar}/>
                          </label>
                          <p className="mx-2 text-[#C8CDCA]">o arrastra hasta aquí</p>
                        </div>
                          <p className="text-[#6D706F] text-xs leading-5">PNG, JPG, GIF hasta 10MB </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-5 bg-white/60 text-red-600 text-center py-1 rounded-md tracking-wide font-semibold">Mensaje error</p>
            <button type="submit" className="mt-5 bg-[#143A27] w-full py-2 uppercase text-base font-bold tracking-wide rounded-md text-[#D4D9D8] hover:text-white hover:bg-[#02321A] duration-200">Registrarse</button>
          </div>
        </form>
        <p className="text-sm leading-6 text-[#4B6C64] text-center py-6">¿Ya tienes una cuenta creada? <button onClick={()=>setLogin(true)} className="text-[#143A27] font-semibold underline underline-offset-2 decoration-[1px] hover:text-white duration-200">Iniciar sesión</button></p>
        </div>
      )}
    </div>
  );
};

export default Signup;

//color 1: #143A27
//color 2: #4B6C64
//color 3: #4C7856
//color 4: #708D79
//color 5: #8C9C9C
//color 6: #96A89C
//color 7: #A4ACA6
//color 8: #D4D9D8
