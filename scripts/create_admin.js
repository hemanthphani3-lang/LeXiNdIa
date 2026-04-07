import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or Key missing in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdmin() {
  const adminEmail = 'admin@lexindia.com';
  const adminPassword = 'admin@1234';
  const fullName = 'Platform Administrator';

  console.log(`Creating admin account: ${adminEmail}...`);

  // 1. Sign up the user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: adminEmail,
    password: adminPassword,
    options: {
      data: {
        full_name: fullName,
        role: 'admin'
      }
    }
  });

  if (authError) {
    if (authError.message.includes('already registered')) {
      console.log('Admin account already exists in Auth.');
      // If it exists, we still want to make sure the profile has the admin role
      // We can't easily get the ID without signing in or using service_role
      console.log('Please ensure the corresponding profile has the "admin" role in the database.');
    } else {
      console.error('Error creating admin auth:', authError.message);
    }
    return;
  }

  console.log('Admin auth account created successfully!');
  console.log('Note: If email confirmation is enabled, you may need to confirm the email in the Supabase dashboard.');
  
  // The profile should be created automatically by the trigger we added in schema.sql
  // but the trigger needs to handle the 'role' from metadata.
}

createAdmin();
