import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

console.log('SUPABASE_URL:', supabaseUrl);
console.log('SUPABASE_KEY:', supabaseKey ? '[REDACTED]' : 'undefined');

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing in environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Export the Supabase client directly.
// All database operations will now use this client directly,
// requiring a refactor of existing SQL queries into Supabase client methods.
export default supabase;