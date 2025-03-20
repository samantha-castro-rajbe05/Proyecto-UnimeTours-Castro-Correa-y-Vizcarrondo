
import { createClient } from '@supabase/supabase-js';
import heic2any from 'heic2any';

const supabaseUrl = 'https://enjgxgixvbjzxsjryelr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuamd4Z2l4dmJqenhzanJ5ZWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxNjU0OTIsImV4cCI6MjA1Nzc0MTQ5Mn0.oJ3e4CO4cHlpbnB9uoKpsK6fnvqzG2F-uhfqFabrgmI';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadImage = async (file, bucket, folder) => {
  try {
    // Convertir HEIC a JPEG ANTES de cualquier cosa
    let processedFile = file;
    if (file.type === 'image/heic' || file.name.toLowerCase().endsWith('.heic')) {
      const conversionResult = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.8
      });
      
      processedFile = new File(
        [conversionResult], 
        file.name.replace(/\.heic$/i, '.jpg'), // Forzar extensión .jpg
        { type: 'image/jpeg' }
      );
    }

    // Generar nombre de archivo CON extensión correcta
    const fileExt = processedFile.name.split('.').pop().toLowerCase();
    const fileName = `${folder}/${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 8)}.${fileExt}`;

    // Subir archivo (verificar Content-Type)
    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, processedFile, {
        cacheControl: 'public, max-age=31536000',
        contentType: processedFile.type // Asegurar tipo MIME correcto
      });

    if (error) throw error;

    // Obtener URL SIN transformaciones (las de Supabase no funcionan bien con HEIC)
    const { data: { publicUrl } } = await supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return publicUrl;

  } catch (error) {
    console.error("Error crítico:", {
      originalFile: file?.name,
      processedFile: processedFile?.name,
      error: error.message
    });
    throw new Error('Error al procesar la imagen');
  }
};