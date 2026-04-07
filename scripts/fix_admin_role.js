import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixAdminRole() {
  console.log('Fixing Admin role for admin@lexindia.com...');
  
  const { data, error } = await supabase
    .from('profiles')
    .update({ role: 'admin' })
    .eq('email', 'admin@lexindia.com')
    .select();

  if (error) {
    console.error('Error updating role:', error.message);
  } else {
    console.log('Success! Admin role assigned:', data);
  }
}

fixAdminRole();
