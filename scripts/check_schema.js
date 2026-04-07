import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  console.log('Checking if "profiles" table exists...');
  const { data, error } = await supabase.from('profiles').select('*').limit(1);
  
  if (error) {
    console.error('Error accessing profiles table:', error.message);
    if (error.message.includes('not found')) {
      console.log('CRITICAL: The profiles table does NOT exist. Please run schema.sql in the Supabase SQL Editor.');
    }
  } else {
    console.log('Success: "profiles" table is accessible.');
  }
}

checkSchema();
