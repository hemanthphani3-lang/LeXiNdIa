import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function forceAdmin() {
  console.log('Force-fixing Admin role and email for the first profile...');
  
  // 1. Get the first profile
  const { data: profiles, error: fetchError } = await supabase.from('profiles').select('*').limit(1);
  
  if (fetchError || !profiles || profiles.length === 0) {
    console.error('No profiles found to fix.');
    return;
  }

  const user = profiles[0];
  console.log(`Found user: ${user.id}. Upgrading to admin...`);

  // 2. Update to admin
  const { data, error } = await supabase
    .from('profiles')
    .update({ 
      role: 'admin',
      email: 'admin@lexindia.com',
      full_name: 'Platform Administrator'
    })
    .eq('id', user.id)
    .select();

  if (error) {
    console.error('Error force-fixing admin:', error.message);
  } else {
    console.log('Success! Admin profile is now ready:', data);
  }
}

forceAdmin();
