import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://enjgxgixvbjzxsjryelr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuamd4Z2l4dmJqenhzanJ5ZWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxNjU0OTIsImV4cCI6MjA1Nzc0MTQ5Mn0.oJ3e4CO4cHlpbnB9uoKpsK6fnvqzG2F-uhfqFabrgmI';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadImage = async (file, bucket, folder) => {
  try {
    // Validación de parámetros
    if (!file || !bucket || !folder) {
      throw new Error("Parámetros incompletos para subir la imagen");
    }

    // Generar nombre único con estructura organizada
    const timestamp = Date.now();
    const safeFolder = folder.replace(/[^a-zA-Z0-9/_]/g, "");
    const uniqueName = `${safeFolder}/${timestamp}_${Math.random()
      .toString(36)
      .substring(2, 8)}.${file.name.split(".").pop()}`;

    // Subir el archivo con opciones específicas
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(uniqueName, file, {
        cacheControl: "public, max-age=31536000", // 1 año de cache
        contentType: file.type,
        upsert: false
      });

    if (uploadError) throw uploadError;

    // Obtener URL pública con parámetro de cache-busting
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(uniqueName, {
        download: false,
        transform: {
          width: 800,
          height: 600,
          quality: 80
        }
      });

    return `${publicUrl}?t=${timestamp}`; // Forzar actualización de caché

  } catch (error) {
    console.error("Error detallado en uploadImage:", {
      error,
      bucket,
      folder,
      fileInfo: file ? { name: file.name, type: file.type, size: file.size } : null
    });
    throw new Error(`Error al subir imagen: ${error.message}`);
  }
};