import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
// Importa tu configuración/credenciales de Firebase
import {auth, db} from "../firebaseConfig"; // Ajusta la ruta según tu estructura
import "/src/css/App.css";

// Inicializar Firestore


const App = () => {
  const navigate = useNavigate();

  // Estado para almacenar el rol del usuario y el estado de carga
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, loadingAuth, errorAuth] = useAuthState(auth);

  // Obtener el rol del usuario desde la colección "users"
  useEffect(() => {
    async function getUserRole() {
      try {
        // Usar el uid del usuario autenticado
        if (!user) {
          console.log("No hay usuario autenticado.");
          setRole("usuario");
          setLoading(false);
          return;
        }
        
        const uid = user.uid;
        console.log("UID obtenido:", uid);
        
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          console.log("Datos del usuario:", userData);
          setRole(userData.role || "usuario");
        } else {
          console.log("No se encontró el usuario con ese uid.");
          setRole("usuario"); 
        }
      } catch (error) {
        console.error("Error fetching user role: ", error);
        setRole("usuario");
      }
      setLoading(false);
    }

    // Ejecutar solo si la carga de autenticación ya terminó
    if (!loadingAuth) {
      getUserRole();
    }
  }, [user, loadingAuth]);

  if (loading || loadingAuth) {
    return <div>Cargando...</div>;
  }

 
if (role === "admin") {

  return (
    
    <>
    {/* Sección de la imagen */}
    <section className="mb-8">
      <div
        className="font-serif relative h-[450px] bg-cover bg-center"
        style={{ backgroundImage: "url('/UnimeTours-landing-page.jpg')" }}
      >
        <div className="relative z-10 flex justify-center items-center h-full pt-28">
          <h2 className="text-7xl text-white font-bold font-serif montserrat">
            UnimeTours
          </h2>
        </div>
      </div>
    </section>

    <div className="text-5xl font-semibold font-serif roboto-subtitulos text-[#143A27] px-15 pb-5 text-center">¡Bienvenido administrador!</div>

    {/* Contenedor de botones */}
    <div className="flex justify-center items-center mt-8 mb-8 space-x-4">
      <button
        className="bg-[#143A27] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#96A89C] transition duration-300"
        
      >
        Administrar rutas
      </button>
      <button
        className="bg-[#143A27] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#96A89C] transition duration-300"
        onClick={() => navigate("/cambiar-role")}
      >
        Administrar guías
      </button>
    </div>
  </>
  )
  


     
} else if (role === "guia") {
    return (
        <div className="bg-[#c7e0cd]">
            <section> {/* imagen superior avila + titulo */}
                <div className="font-serif relative h-[450px] bg-cover bg-center " style={{ backgroundImage: "url('/UnimeTours-landing-page.jpg')" }}>
                    <div className="relative z-10 flex justify-center items-center h-full pt-28">
                        <h2 className="text-7xl text-white font-bold font-serif montserrat">UnimeTours</h2>
                    </div>
                </div>
            </section>
            <section >
            <h2 className="text-6xl font-semibold font-serif roboto-subtitulos text-[#143A27] text-center p-10">¡Bienvenido guía!</h2>
            </section>
            <section>
                <div className="flex w-full">
                    
                    <div>
                        <img src="/unimetours-logo-landing-page.png" className="w-full pl-30 py-15" alt="UnimeTours Logo"/>
                    </div>
                    <div className="w-1/2 ">
                        
                        <h2 className="text-5xl font-semibold font-serif roboto-subtitulos text-[#143A27] px-15 pt-20 pb-5">Conócenos</h2>
                        <p className="font-light font-serif roboto-parrafos pl-15"> Somos UnimeTours, una página hecha por estudiantes de la Universidad Metropolitana que te permite seguir tu espíritu aventurero y facilitarte el reservar paseos de senderismo en el Parque Nacional Waraira Repano, mejor conocido como Cerro el Ávila, que se encuentra en Caracas, Venezuela.</p>
                        <div className="font-light font-serif roboto-parrafos pl-15">
                            <p> <strong>Mision:</strong> Buscamos facilitar a la comunidad unimetana el acceso seguro y sencillo a rutas de senderismo en el Waraira Repano, impulsando su espíritu aventurero y conexión con la naturaleza. </p>
                        </div>
                        <div className= "font-light font-serif roboto-parrafos pl-15">
                            <p> <strong>Vision:</strong> Con el fin de inspirar a la comunidad unimetana a explorar y disfrutar el Waraira Repano, formando una comunidad unida por el amor a la naturaleza y creando experiencias inolvidables. </p>
                        </div>
                    </div>
                </div>
            </section>



            <section>
                <div className="panel-image-content-reverse pl-15 py-10 px-20 pt-10 bg-[#a4b9ab]">
                <div className="flex w-full ">
                   
                    <div className="w-1/2">
                        <h2 className="text-heading text-5xl font-semibold font-serif roboto-subtitulos text-[#143A27] px-15 pb-5 pt-20">Blogs</h2>
                        <p className = "subheading text-3xl font-bold font-serif roboto-subtitulos text-[#143A27] mb-6 px-15 pb-5">Mi experiencia en Sabas Nieves</p>
                        <p className="text2 font-light font-serif roboto-parrafos leading-relaxed pl-15">
                            El día de hoy 09/03/2025 realicé la ruta de senderismo dictada por
                            el guía Juan Pérez, fue una experiencia increíble pude visitar la
                            ruta desde una nueva perspectiva, conocí muchas cosas que no tenía
                            conocimiento de su existencia. Me encantó la experiencia y la
                            facilidad con que la pude vivir mediante esta plataforma. </p>  
                    </div>
                    <div>
                        <img src="image4.png" className="w-full pl-40 py-15" alt="Imagen de Sabas Nieves"/>
                    </div>
                </div>
                <div className="text-center mt-3">
                <button className="bg-[#143A27] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#96A89C] transition duration-300" onClick={() => window.location.href = "/blog"} >Ver más</button>
                </div>
                </div>
            </section>


            <section>
                <div className="card-grid-reviews w-full pl-30 py-20 px-30 pt-5 pb-10  rounded-lg shadow-lg">
                    <div className="text-heading">
                        <div className="text-heading text-5xl font-semibold font-serif roboto-subtitulos text-[#143A27] px-15 pb-5 pt-10">
                        Feedbacks
                        </div>
                    </div>

                    <div className="card-grid grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Review Card 1 */}
                        <div className="review-card bg-[#D4D9D8] shadow-md rounded-lg p-4">
                        <div className="rating flex items-center gap-1 pb-3">
                            <img className="star" src="star0.svg" alt="Star 1" />
                            <img className="star" src="star0.svg" alt="Star 2" />
                            <img className="star" src="star0.svg" alt="Star 3" />
                            <img className="star" src="star0.svg" alt="Star 4" />
                            <img className="star" src="star1.svg" alt="Star 5" />
                        </div>
                        <div className="review-body">
                            <div className="text-heading">
                            <div className="text-2xl font-bold font-serif roboto-parrafos text-[#143A27] mb-2">
                                Sabas Nieves
                            </div>
                            </div>
                        </div>
                        <div className="avatar-block">
                            <div className="info">
                            <div className="text-2xl font-semibold font-serif roboto-parrafos text-[#143A27] mb-2">
                                @pablo122
                            </div>
                            </div>
                        </div>
                        </div>

                        {/* Review Card 2 */}
                        <div className="review-card bg-[#D4D9D8] shadow-md rounded-lg p-4">
                        <div className="rating flex items-center gap-1 pb-3">
                            <img className="star6" src="star0.svg" alt="Star 6" />
                            <img className="star7" src="star0.svg" alt="Star 7" />
                            <img className="star8" src="star0.svg" alt="Star 8" />
                            <img className="star9" src="star1.svg" alt="Star 9" />
                            <img className="star10" src="star1.svg" alt="Star 10" />
                        </div>
                        <div className="review-body">
                            <div className="text-heading">
                            <div className="text-2xl font-bold font-serif roboto-parrafos text-[#143A27] mb-2">
                                Pico el Ávila
                            </div>
                            </div>
                        </div>
                        <div className="avatar-block">
                            <div className="info">
                            <div className="text-2xl font-semibold font-serif roboto-parrafos text-[#143A27] mb-2">
                                @mariax44
                            </div>
                            </div>
                        </div>
                        </div>

                        {/* Review Card 3 */}
                        <div className="review-card bg-[#D4D9D8] shadow-md rounded-lg p-4">
                        <div className="rating flex items-center gap-1 pb-3">
                            <img className="star11" src="star0.svg" alt="Star 11" />
                            <img className="star12" src="star0.svg" alt="Star 12" />
                            <img className="star13" src="star1.svg" alt="Star 13" />
                            <img className="star14" src="star1.svg" alt="Star 14" />
                            <img className="star15" src="star1.svg" alt="Star 15" />
                        </div>
                        <div className="review-body">
                            <div className="text-heading">
                            <div className="text-2xl font-bold font-serif roboto-parrafos text-[#143A27] mb-2">
                                Cruz del Ávila
                            </div>
                            </div>
                        </div>
                        <div className="avatar-block">
                            <div className="info">
                            <div className="text-2xl font-bold font-serif roboto-parrafos text-[#143A27] mb-2">
                                @carl89
                            </div>
                            </div>
                        </div>
                        </div>
                        </div>
                        <div className="text-center mt-3">
                        <button className="bg-[#143A27] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#96A89C] transition duration-300" onClick={() => window.location.href = "/feedback"} >Ver más</button>
                        </div>
                    </div>
            

            </section>
               

            <section className="bg-[#a4b9ab]">
                <div>
                <div className="text-heading text-5xl font-semibold font-serif roboto-subtitulos text-[#143A27] px-30 pb-5 pt-10">Mapa</div>
                </div>
                <div>
                <img src="avilamap.jpeg" className="w-full pl-30 py-15 pr-30" alt="Imagen del Avila"/>
                </div>
            </section>

            
        </div>
    );



}else {


// const App = () => {
//     const navigate = useNavigate();
 

//     useEffect(() => {
//         navigate("/");
//     }, [navigate]);

    // if (role ==="usuario"){ 
    return (
        <div>
            <section> {/* imagen superior avila + titulo */}
                <div className="font-serif relative h-[450px] bg-cover bg-center" style={{ backgroundImage: "url('/UnimeTours-landing-page.jpg')" }}>
                    <div className="relative z-10 flex justify-center items-center h-full pt-28">
                        <h2 className="text-7xl text-white font-bold font-serif montserrat">UnimeTours</h2>
                    </div>
                </div>
            </section>
            <section>
                <div className="flex w-full">
                    <div>
                        <img src="/unimetours-logo-landing-page.png" className="w-full pl-30 py-15" alt="UnimeTours Logo"/>
                    </div>
                    <div className="w-1/2">
                        <h2 className="text-5xl font-semibold font-serif roboto-subtitulos text-[#143A27] px-15 pt-20 pb-5">Conócenos</h2>
                        <p className="font-light font-serif roboto-parrafos pl-15"> Somos UnimeTours, una página hecha por estudiantes de la Universidad Metropolitana que te permite seguir tu espíritu aventurero y facilitarte el reservar paseos de senderismo en el Parque Nacional Waraira Repano, mejor conocido como Cerro el Ávila, que se encuentra en Caracas, Venezuela.</p>
                        <div className="font-light font-serif roboto-parrafos pl-15">
                            <p> <strong>Mision:</strong> Buscamos facilitar a la comunidad unimetana el acceso seguro y sencillo a rutas de senderismo en el Waraira Repano, impulsando su espíritu aventurero y conexión con la naturaleza. </p>
                        </div>
                        <div className= "font-light font-serif roboto-parrafos pl-15">
                            <p> <strong>Vision:</strong> Con el fin de inspirar a la comunidad unimetana a explorar y disfrutar el Waraira Repano, formando una comunidad unida por el amor a la naturaleza y creando experiencias inolvidables. </p>
                        </div>
                    </div>
                </div>
            </section>


            <section>
           
                <div className="card-grid-image w-full pl-30 py-15 px-30 pt-10 bg-[#96A89C] rounded-lg shadow-lg">
                    <div className="text-content-heading">
                        <h2 className="text-5xl font-semibold font-serif roboto-subtitulos text-[#143A27] px-15 pb-5">
                        Nuestras rutas
                        </h2>
                    </div>

                    {/* Aquí se configura el grid con Tailwind */}
                    <div className="cards grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Tarjeta 1 */}
                        <div className="card bg-[#D4D9D8] shadow-md rounded-lg p-4">
                        <img className="image w-full h-40 object-cover rounded-t-lg" src="image0.png" alt="Ruta 1" />
                        <div className="body">
                            <div className="text">
                            <div className="text-2xl font-bold font-serif roboto-parrafos text-[#143A27] mb-2">2-3 horas</div>
                            <ul className="details-list font-light font-serif roboto-parrafos text-sm">
                                <li>Dificultad: moderada</li>
                                <li>Altura: 1.500 m</li>
                                <li>Distancia: 5-6 km</li>
                                <li>Ruta: Los Cujíes</li>
                            </ul>
                            </div>
                        </div>
                        </div>

                        {/* Tarjeta 2 */}
                        <div className="card bg-[#D4D9D8] shadow-md rounded-lg p-4">
                        <img className="image w-full h-40 object-cover rounded-t-lg" src="image1.png" alt="Ruta 2" />
                        <div className="body">
                            <div className="text">
                            <div className="text-2xl font-bold font-serif roboto-parrafos text-[#143A27] mb-2">3-4 horas</div>
                            <ul className="details-list font-light font-serif roboto-parrafos text-sm">
                                <li>Dificultad: alta</li>
                                <li>Altura: 2.100 m</li>
                                <li>Distancia: 8-10 km</li>
                                <li>Ruta: Pico el Ávila</li>
                            </ul>
                            </div>
                        </div>
                        </div>

                        {/* Tarjeta 3 */}
                        <div className="card bg-[#D4D9D8] shadow-md rounded-lg p-4">
                        <img className="image w-full h-40 object-cover rounded-t-lg" src="image2.png" alt="Ruta 3" />
                        <div className="body">
                            <div className="text">
                            <div className="text-2xl font-bold font-serif roboto-parrafos text-[#143A27] mb-2">4-5 horas</div>
                            <ul className="details-list font-light font-serif roboto-parrafos text-sm">
                                <li>Dificultad: moderada</li>
                                <li>Altura: 1.500 m</li>
                                <li>Distancia: 5 km</li>
                                <li>Ruta: La Cascada</li>
                            </ul>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="text-center mt-3">
                    <button className="bg-[#143A27] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#96A89C] transition duration-300" onClick={() => navigate("/rutas")} >Ver más</button>
                    </div>
                </div>

            </section>


            <section>
                <div className="panel-image-content-reverse pl-15 py-10 px-20 pt-10">
                <div className="flex w-full">
                   
                    <div className="w-1/2">
                        <h2 className="text-heading text-5xl font-semibold font-serif roboto-subtitulos text-[#143A27] px-15 pb-5 pt-20">Blogs</h2>
                        <p className = "subheading text-3xl font-bold font-serif roboto-subtitulos text-[#143A27] mb-6 px-15 pb-5">Mi experiencia en Sabas Nieves</p>
                        <p className="text2 font-light font-serif roboto-parrafos leading-relaxed pl-15">
                            El día de hoy 09/03/2025 realicé la ruta de senderismo dictada por
                            el guía Juan Pérez, fue una experiencia increíble pude visitar la
                            ruta desde una nueva perspectiva, conocí muchas cosas que no tenía
                            conocimiento de su existencia. Me encantó la experiencia y la
                            facilidad con que la pude vivir mediante esta plataforma. </p>  
                    </div>
                    <div>
                        <img src="image4.png" className="w-full pl-40 py-15" alt="Imagen de Sabas Nieves"/>
                    </div>
                </div>
                <div className="text-center mt-3">
                <button className="bg-[#143A27] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#96A89C] transition duration-300" onClick={() => window.location.href = "/blog"} >Ver más</button>
                </div>
                </div>
            </section>


            <section>
                <div className="card-grid-reviews w-full pl-30 py-20 px-30 pt-5 pb-10 bg-[#96A89C] rounded-lg shadow-lg">
                    <div className="text-heading">
                        <div className="text-heading text-5xl font-semibold font-serif roboto-subtitulos text-[#143A27] px-15 pb-5 pt-10">
                        Feedbacks
                        </div>
                    </div>

                    <div className="card-grid grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Review Card 1 */}
                        <div className="review-card bg-[#D4D9D8] shadow-md rounded-lg p-4">
                        <div className="rating flex items-center gap-1 pb-3">
                            <img className="star" src="star0.svg" alt="Star 1" />
                            <img className="star" src="star0.svg" alt="Star 2" />
                            <img className="star" src="star0.svg" alt="Star 3" />
                            <img className="star" src="star0.svg" alt="Star 4" />
                            <img className="star" src="star1.svg" alt="Star 5" />
                        </div>
                        <div className="review-body">
                            <div className="text-heading">
                            <div className="text-2xl font-bold font-serif roboto-parrafos text-[#143A27] mb-2">
                                Sabas Nieves
                            </div>
                            </div>
                        </div>
                        <div className="avatar-block">
                            <div className="info">
                            <div className="text-2xl font-semibold font-serif roboto-parrafos text-[#143A27] mb-2">
                                @pablo122
                            </div>
                            </div>
                        </div>
                        </div>

                        {/* Review Card 2 */}
                        <div className="review-card bg-[#D4D9D8] shadow-md rounded-lg p-4">
                        <div className="rating flex items-center gap-1 pb-3">
                            <img className="star6" src="star0.svg" alt="Star 6" />
                            <img className="star7" src="star0.svg" alt="Star 7" />
                            <img className="star8" src="star0.svg" alt="Star 8" />
                            <img className="star9" src="star1.svg" alt="Star 9" />
                            <img className="star10" src="star1.svg" alt="Star 10" />
                        </div>
                        <div className="review-body">
                            <div className="text-heading">
                            <div className="text-2xl font-bold font-serif roboto-parrafos text-[#143A27] mb-2">
                                Pico el Ávila
                            </div>
                            </div>
                        </div>
                        <div className="avatar-block">
                            <div className="info">
                            <div className="text-2xl font-semibold font-serif roboto-parrafos text-[#143A27] mb-2">
                                @mariax44
                            </div>
                            </div>
                        </div>
                        </div>

                        {/* Review Card 3 */}
                        <div className="review-card bg-[#D4D9D8] shadow-md rounded-lg p-4">
                        <div className="rating flex items-center gap-1 pb-3">
                            <img className="star11" src="star0.svg" alt="Star 11" />
                            <img className="star12" src="star0.svg" alt="Star 12" />
                            <img className="star13" src="star1.svg" alt="Star 13" />
                            <img className="star14" src="star1.svg" alt="Star 14" />
                            <img className="star15" src="star1.svg" alt="Star 15" />
                        </div>
                        <div className="review-body">
                            <div className="text-heading">
                            <div className="text-2xl font-bold font-serif roboto-parrafos text-[#143A27] mb-2">
                                Cruz del Ávila
                            </div>
                            </div>
                        </div>
                        <div className="avatar-block">
                            <div className="info">
                            <div className="text-2xl font-bold font-serif roboto-parrafos text-[#143A27] mb-2">
                                @carl89
                            </div>
                            </div>
                        </div>
                        </div>
                        </div>
                        <div className="text-center mt-3">
                        <button className="bg-[#143A27] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#96A89C] transition duration-300" onClick={() => window.location.href = "/feedback"} >Ver más</button>
                        </div>
                    </div>
            

            </section>
               

            <section>
                <div>
                <div className="text-heading text-5xl font-semibold font-serif roboto-subtitulos text-[#143A27] px-30 pb-5 pt-10">Mapa</div>
                </div>
                <div>
                <img src="avilamap.jpeg" className="w-full pl-30 py-15 pr-30" alt="Imagen del Avila"/>
                </div>
            </section>

            
        </div>
    );
} 
};


export default App;

