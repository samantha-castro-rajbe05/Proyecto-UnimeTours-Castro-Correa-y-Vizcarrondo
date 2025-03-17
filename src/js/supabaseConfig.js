import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://enjgxgixvbjzxsjryelr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuamd4Z2l4dmJqenhzanJ5ZWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxNjU0OTIsImV4cCI6MjA1Nzc0MTQ5Mn0.oJ3e4CO4cHlpbnB9uoKpsK6fnvqzG2F-uhfqFabrgmI';

export const supabase = createClient(supabaseUrl, supabaseKey);


//clave api: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuamd4Z2l4dmJqenhzanJ5ZWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxNjU0OTIsImV4cCI6MjA1Nzc0MTQ5Mn0.oJ3e4CO4cHlpbnB9uoKpsK6fnvqzG2F-uhfqFabrgmI
//url pryecto: https://enjgxgixvbjzxsjryelr.supabase.co