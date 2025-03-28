import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  db,
  auth,
  providerGoogle,
  providerFacebook,
} from "../../firebaseConfig.js";
import { uploadImage } from "../../supabaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  deleteUser,
} from "firebase/auth";
import Login from "./login.jsx";
import Label from "./label.jsx";
import { PhotoIcon } from "@heroicons/react/24/solid";

// (Las funciones fbSignUp y googleSignUp no se utilizan, pero se dejan por compatibilidad)
const fbSignUp = async () => {
  const fbUser = await signInWithPopup(auth, providerFacebook);
  return fbUser;
};

const googleSignUp = async () => {
  const googleUser = await signInWithPopup(auth, providerGoogle);
  return googleUser;
};

const Signup = () => {
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [avatar, setAvatar] = useState({ file: null, url: "" });
  const [role, setRole] = useState("usuario"); // Estado para el rol seleccionado
  const navigate = useNavigate();

  const [telefono, setTelefono] = useState("+58-");
  const [telefonoError, setTelefonoError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // Regex para comprobar que el correo sea de dominio permitido
  const allowedEmailRegex = /^[a-zA-Z0-9._%+-]+@(correo\.unimet\.edu\.ve|unimet\.edu\.ve)$/;

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { nombre, apellido, telefono, email, contraseña } =
      Object.fromEntries(formData);

    // Validar que el email pertenezca a los dominios permitidos
    if (!allowedEmailRegex.test(email)) {
      setErrMsg("El correo electrónico debe ser @correo.unimet.edu.ve o @unimet.edu.ve.");
      setLoading(false);
      return;
    }
    
    // Validar que no existan errores en teléfono y email
    if (telefonoError !== "" || emailError !== "") {
      setErrMsg("Por favor, corrija los errores del formulario antes de continuar.");
      setLoading(false);
      return;
    }

    // Validar la longitud de la contraseña
    if (contraseña.length < 6) {
      setErrMsg("La contraseña debe tener al menos 6 caracteres.");
      setLoading(false);
      return;
    }

    let user = null;

    try {
      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        contraseña
      );
      user = userCredential.user;

      // Subir la foto de perfil a Supabase (si se seleccionó)
      let avatarUrl = "";
      if (avatar.file) {
        avatarUrl = await uploadImage(
          avatar.file,
          "unimetours-fotos",
          `public/${user.uid}`
        );
      }

      // Guardar datos del usuario en Firestore
      await setDoc(doc(db, "users", user.uid), {
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        email: email,
        uid: userCredential.user.uid,
        avatarUrl: avatarUrl || "",
        fechaCreacion: new Date(),
        role: role, // Guardar el rol seleccionado
      });

      setLoading(false);
      setLogin(true);
      navigate("/");
    } catch (error) {
      console.error("Error al registrarse:", error);
      if (error.code === "auth/email-already-in-use") {
        setErrMsg("El correo electrónico ya está en uso.");
      } else if (error.message.includes("Bucket not found")) {
        setErrMsg("El bucket de almacenamiento no existe.");
      } else if (error.message.includes("Unauthorized")) {
        setErrMsg("No tienes permiso para subir archivos.");
      } else {
        setErrMsg(error.message);
      }

      // Eliminar el usuario de Firebase Auth si hubo un error
      if (user) {
        await deleteUser(user);
      }

      setLoading(false);
    }
  };

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleTelefonoChange = (e) => {
    const value = e.target.value;
    setTelefono(value);

    const regex = /^\+58-(414|412|424|212|416|426)\d{7}$/;

    if (regex.test(value)) {
      setTelefonoError("");
    } else if (value === "+58-") {
      setTelefonoError("");
    } else {
      setTelefonoError(
        "El número de teléfono debe comenzar con +58 seguido de 414, 412, 424, 212, 416 o 426 y contener 7 dígitos después del guion."
      );
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value === "") {
      setEmailError("");
    } else if (allowedEmailRegex.test(value)) {
      setEmailError("");
    } else {
      setEmailError(
        "El correo electrónico debe ser @correo.unimet.edu.ve o @unimet.edu.ve."
      );
    }
  };

  const handleFacebookSignUp = async () => {
    try {
      setLoading(true);
      const fbUser = await signInWithPopup(auth, providerFacebook);

      // Validar que el email del usuario de Facebook pertenezca a los dominios permitidos
      if (!allowedEmailRegex.test(fbUser.user.email)) {
        setErrMsg("El correo electrónico debe ser @correo.unimet.edu.ve o @unimet.edu.ve.");
        setLoading(false);
        await auth.signOut();
        return;
      }

      const userDoc = await getDoc(doc(db, "users", fbUser.user.uid));
      if (userDoc.exists()) {
        setLoading(false);
        setErrMsg("Este usuario ya está registrado. Por favor, inicie sesión.");
        await auth.signOut();
      } else {
        await setDoc(doc(db, "users", fbUser.user.uid), {
          nombre: fbUser.user.displayName,
          email: fbUser.user.email,
          telefono: telefono,
          uid: fbUser.user.uid,
          fechaCreacion: new Date(),
          provider: "facebook",
        });
        setLoading(false);
        setLogin(true);
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setErrMsg(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      const googleUser = await signInWithPopup(auth, providerGoogle);

      // Validar que el email del usuario de Google pertenezca a los dominios permitidos
      if (!allowedEmailRegex.test(googleUser.user.email)) {
        setErrMsg("El correo electrónico debe ser @correo.unimet.edu.ve o @unimet.edu.ve.");
        setLoading(false);
        await auth.signOut();
        return;
      }

      const userDoc = await getDoc(doc(db, "users", googleUser.user.uid));
      if (userDoc.exists()) {
        setLoading(false);
        setErrMsg("Este usuario ya está registrado. Por favor, inicie sesión.");
        await auth.signOut();
      } else {
        await setDoc(doc(db, "users", googleUser.user.uid), {
          nombre: googleUser.user.displayName,
          email: googleUser.user.email,
          telefono: telefono,
          uid: googleUser.user.uid,
          fechaCreacion: new Date(),
          provider: "google",
        });
        setLoading(false);
        setLogin(true);
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setErrMsg(error.message);
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
            <div className="border-b border-[#143A27]/20 pb-5">
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
                            {avatar?.url ? (
                              <img
                                src={avatar?.url}
                                alt="profileImg"
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              <PhotoIcon
                                className="mx-auto h-full w-full text-[#BDC2C1]"
                                aria-hidden="true"
                              />
                            )}
                          </div>
                          <div className="mt-4 flex items-center mb-1 text-sm leading-6 text-center text-[#C8CDCA] ">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md px-2 py-1 bg-[#4B6C64] font-semibold outline-none ring-1 focus-within:ring-2 hover:bg-[#38534C]"
                            >
                              <span>Subir una imagen</span>
                              <input
                                type="file"
                                name="file-upload"
                                id="file-upload"
                                className="sr-only"
                                onChange={handleAvatar}
                              />
                            </label>
                          </div>
                          <p className="text-[#6D706F] text-xs leading-5">
                            PNG, JPG hasta 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  {/* <Label title="Rol" htmlFor="role" />
                  <select
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="block w-full rounded-md border border-white py-2 text-black rounded-[20px] shadow-sm outline-white sm:text-sm sm-leading-6 px-4"
                  >
                    <option value="usuario">Usuario</option>
                    <option value="guia">Guía</option>
                  </select> */}
                </div>
              </div>
              <p className="mt-5 bg-white/60 text-red-600 text-center py-1 rounded-md tracking-wide font-semibold">
                {errMsg}
              </p>
              <button
                type="submit"
                className="mt-5 bg-[#143A27] w-full py-2 uppercase text-base font-bold tracking-wide rounded-md text-[#D4D9D8] hover:text-white hover:bg-[#02321A] duration-200"
              >
                Registrarse
              </button>
            </div>
            <div className="social-login flex flex-col space-y-4">
              <button
                type="button"
                className="btn-secondary auth-btn social-auth-btn bg-white/60 mt-5 w-full py-2 text-base font-semibold tracking-wide rounded-md text-[#02321A] hover:text-white hover:bg-[#02321A] duration-200 flex items-center justify-center space-x-2"
                onClick={handleGoogleSignUp}
              >
                <img src="fotoGoogle.png" alt="Google" className="h-8" />
                <span>Registrarse con Google</span>
              </button>
              <button
                type="button"
                className="btn-secondary auth-btn social-auth-btn bg-white/60 w-full py-2 text-base font-semibold tracking-wide rounded-md text-[#02321A] hover:text-white hover:bg-[#02321A] duration-200 flex items-center justify-center space-x-2"
                onClick={handleFacebookSignUp}
              >
                <img src="fotoFacebook.png" alt="Facebook" className="h-8" />
                <span>Registrarse con Facebook</span>
              </button>
            </div>
          </form>
          <p className="text-sm leading-6 text-[#4B6C64] text-center py-6">
            ¿Ya tienes una cuenta creada?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-[#143A27] font-semibold underline underline-offset-2 decoration-[1px] hover:text-white duration-200"
            >
              Iniciar sesión
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default Signup;
