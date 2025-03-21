import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebaseConfig.js";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { supabase, uploadImage } from "../../supabaseConfig";
import Label from "../../components/login-signup/label.jsx";
import { PhotoIcon } from "@heroicons/react/24/solid";

const EditProfile = ({ user }) => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("+58-");
    const [avatar, setAvatar] = useState({ file: null, url: "" });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user || !user.uid) {
                console.log("❌ No hay usuario autenticado");
                setLoading(false);
                return;
            }

            console.log("✅ Usuario detectado:", user.uid);

            try {
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    console.log("📄 Datos obtenidos de Firestore:", userData);

                    setNombre(userData.nombre || "");
                    setApellido(userData.apellido || "");
                    setTelefono(userData.telefono || "+58-");

                    if (userData.avatarUrl) {
                        setAvatar({ url: userData.avatarUrl });
                    }
                } else {
                    console.log("⚠️ El documento del usuario no existe en Firestore.");
                }
            } catch (error) {
                console.error("❌ Error obteniendo datos del usuario:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        if (!user || !user.uid) {
            console.error("❌ Error: No hay usuario autenticado.");
            return;
        }

        try {
            let avatarUrl = avatar.url;
            if (avatar.file) {
                console.log("📤 Subiendo nueva imagen de perfil...");
                avatarUrl = await uploadImage(
                    avatar.file,
                    "unimetours-fotos",
                    `public/${user.uid}`
                );
            }

            console.log("📝 Actualizando datos en Firestore...");
            await updateDoc(doc(db, "users", user.uid), {
                nombre,
                apellido,
                telefono,
                avatarUrl,
            });

            console.log("✅ Perfil actualizado correctamente.");
            navigate("/"); // Redirige al landing page
        } catch (error) {
            console.error("❌ Error al actualizar el perfil:", error);
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

    return (
        <div className="bg-[#96A89C] min-h-screen flex items-center justify-center pb-32">
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
        </div>
    );
};

export default EditProfile;
