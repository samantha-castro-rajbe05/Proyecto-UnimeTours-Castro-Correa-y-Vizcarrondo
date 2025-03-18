import React, { useState } from "react";
import Footer from "../footer.jsx"; // Importa el componente Footer

const Feedback = () => {
  const currentUserId = 1; // Simula el ID del usuario actualmente registrado

  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      userId: 1,
      rating: 5,
      review: "¡Excelente experiencia! Todo fue perfecto.",
    },
    {
      id: 2,
      userId: 2,
      rating: 4,
      review: "Muy buena atención, aunque hubo algunos retrasos.",
    },
    {
      id: 3,
      userId: 3,
      rating: 3,
      review: "La experiencia fue buena, pero podría mejorar en algunos aspectos.",
    },
  ]);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || review.trim() === "") {
      alert("Por favor, selecciona una calificación y escribe una reseña.");
      return;
    }

    const newFeedback = { id: feedbacks.length + 1, userId: currentUserId, rating, review };
    setFeedbacks([newFeedback, ...feedbacks]);
    setRating(0);
    setReview("");
    setShowForm(false);
  };

  const handleDelete = (id) => {
    const updatedFeedbacks = feedbacks.filter((feedback) => feedback.id !== id);
    setFeedbacks(updatedFeedbacks);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      <div className="flex-grow px-10 py-10 flex flex-col-reverse">
        {/* Botón para mostrar el formulario al final */}
        <div className="flex justify-center mt-10">
          {!showForm && (
            <button
              className="bg-[#143A27] text-white py-2 px-6 rounded-lg hover:bg-[#96A89C] transition duration-300"
              onClick={() => setShowForm(true)}
            >
              Añadir Feedback
            </button>
          )}
        </div>

        {/* Formulario para añadir feedback */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-[#D4D9D8] p-8 rounded-lg shadow-lg border-4 border-[#143A27] mb-10"
          >
            <div className="mb-6">
              <label className="block text-[#143A27] font-bold mb-2">Calificación</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    className={`text-3xl ${
                      star <= rating ? "text-yellow-500" : "text-gray-400"
                    }`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-[#143A27] font-bold mb-2">Reseña</label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Escribe tu reseña aquí..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition duration-300"
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-[#143A27] text-white py-2 px-6 rounded-lg hover:bg-[#96A89C] transition duration-300"
              >
                Enviar
              </button>
            </div>
          </form>
        )}

        {/* Lista de feedbacks */}
        <div className="feedback-list">
          {feedbacks.length === 0 ? (
            <p className="text-center text-[#143A27]">
              No hay feedbacks aún. ¡Sé el primero en dejar uno!
            </p>
          ) : (
            feedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="feedback-item flex flex-col bg-[#D4D9D8] p-5 rounded-lg shadow-md mb-5 border-4 border-[#143A27]"
              >
                <div className="flex items-center mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-2xl ${
                        star <= feedback.rating ? "text-yellow-500" : "text-gray-400"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-base font-light text-[#143A27] mb-4">
                  {feedback.review}
                </p>
                {feedback.userId === currentUserId && (
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 self-end"
                    onClick={() => handleDelete(feedback.id)}
                  >
                    Eliminar
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Feedback;
