import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://enjgxgixvbjzxsjryelr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuamd4Z2l4dmJqenhzanJ5ZWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxNjU0OTIsImV4cCI6MjA1Nzc0MTQ5Mn0.oJ3e4CO4cHlpbnB9uoKpsK6fnvqzG2F-uhfqFabrgmI';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadImage = async (file, bucket, folder) => {
  try {
    const fileExt = file.name;
    const fileName = `${Math.random()
      .toString(36)
      .substring(2, 15)}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const filePath = `${folder}/${fileName}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    throw error;
  }
  
};

export const deleteImage = async (filePath, bucket) => {
  try {
    const { error } = await supabase.storage.from(bucket).remove([filePath]);

    if (error) throw error;

    console.log("Imagen eliminada con éxito:", filePath);
    return true;
  } catch (error) {
    console.error("Error al eliminar la imagen:", error);
    return false;
  }
};