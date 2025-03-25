import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig.js";
import { supabase } from "../../supabaseConfig";
import Label from "../../components/login-signup/label.jsx";
import { PhotoIcon } from "@heroicons/react/24/solid";

const EditProfile = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  // Estados para la autenticación
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Estados para los datos del perfil
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [avatar, setAvatar] = useState({ url: "" });
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hook para la autenticación, se llama siempre.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, [auth]);

  // Hook para obtener los datos del usuario desde Firestore (solo se ejecuta si currentUser existe)
  useEffect(() => {
    if (!currentUser) {
      // Si no hay usuario, marcamos loading como falso (para que se renderice el mensaje adecuado)
      setLoading(false);
      return;
    }
    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setNombre(data.nombre || "");
          setApellido(data.apellido || "");
          setTelefono(data.telefono || "");
          setAvatar({ url: data.avatarUrl || "" });
        } else {
          console.error("El usuario no existe en Firestore");
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [currentUser]);

  // Manejo de la selección de una nueva imagen de perfil
  const handleAvatar = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      // Se crea una URL temporal para previsualizar la imagen
      setAvatar({ url: URL.createObjectURL(file) });
      setAvatarFile(file);
    }
  };

  // Función para actualizar el perfil en Firestore y subir la imagen a Supabase (si se cambió)
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    let newAvatarUrl = avatar.url; // Por defecto se mantiene la URL existente

    if (avatarFile) {
      // Se genera un nombre único para la imagen
      const fileName = `${currentUser.uid}_${Date.now()}_${avatarFile.name}`;
      try {
        const { data, error } = await supabase.storage
          .from("unimetours-fotos")
          .upload(`public/${fileName}`, avatarFile, {
            cacheControl: "3600",
            upsert: true,
          });
        if (error) {
          console.error("Error al subir la imagen:", error.message);
          setLoading(false);
          return;
        }
        const { publicURL, error: publicUrlError } = supabase.storage
          .from("unimetours-fotos")
          .getPublicUrl(data.path);
        if (publicUrlError) {
          console.error("Error al obtener la URL pública:", publicUrlError.message);
          setLoading(false);
          return;
        }
        newAvatarUrl = publicURL;
      } catch (uploadError) {
        console.error("Error durante la subida de imagen:", uploadError);
        setLoading(false);
        return;
      }
    }

    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        nombre,
        apellido,
        telefono,
        avatarUrl: newAvatarUrl,
      });
      console.log("Perfil actualizado exitosamente.");
      setAvatar({ url: newAvatarUrl });
      // Opcional: redirigir a otra página, por ejemplo:
      // navigate("/perfil");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error.message);
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#96A89C] min-h-screen flex items-center justify-center pb-32">
      {authLoading ? (
        <p>Cargando autenticación...</p>
      ) : !currentUser ? (
        <p>No estás autenticado. Por favor, inicia sesión.</p>
      ) : (
        <form onSubmit={handleUpdateProfile} className="max-w-5xl mx-auto pt-10 px-10 lg:px-0">
          <div className="border-b border-[#143A27] pb-5">
            <h2 className="text-5xl text-[#143A27] font-semibold font-serif roboto-subtitulos text-center">
              Editar Perfil
            </h2>
          </div>

          {loading ? (
            <p className="text-center text-[#143A27] font-bold mt-10">Cargando datos...</p>
          ) : (
            <div className="border-b border-[#143A27]/20 pb-5">
              <div className="mt-5 grid grid-cols-1 gap-y-6">
                <div>
                  <Label title="Nombre" htmlFor="nombre" />
                  <input
                    type="text"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="block w-full rounded-md border border-white py-0.5 text-black rounded-[20px] shadow-sm outline-white sm:text-sm sm-leading-6 px-4"
                  />
                </div>
                <div>
                  <Label title="Apellido" htmlFor="apellido" />
                  <input
                    type="text"
                    name="apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    className="block w-full rounded-md border border-white py-0.5 text-black rounded-[20px] shadow-sm outline-white sm:text-sm sm-leading-6 px-4"
                  />
                </div>
                <div>
                  <Label title="Teléfono celular" htmlFor="telefono" />
                  <input
                    type="text"
                    name="telefono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="block w-full rounded-md border border-white py-0.5 text-black rounded-[20px] shadow-sm outline-white sm:text-sm sm-leading-6 px-4"
                  />
                </div>
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
                        <div className="mt-4 flex items-center mb-1 text-sm leading-6 text-center text-[#C8CDCA]">
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
                          PNG, JPG, GIF hasta 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="mt-5 bg-[#143A27] w-full py-2 uppercase text-base font-bold tracking-wide rounded-md text-[#D4D9D8] hover:text-white hover:bg-[#02321A] duration-200"
            disabled={loading}
          >
            Guardar Cambios
          </button>
        </form>
      )}
    </div>
  );
};

export default EditProfile;
