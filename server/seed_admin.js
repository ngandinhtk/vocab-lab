// server/seed_admin.js
import { createClient } from '@supabase/supabase-js';
import { randomBytes } from 'crypto';
import dotenv from 'dotenv';

dotenv.config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in environment variables.');
  process.exit(1);
  }

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdmin() {
  const adminEmail = 'admin@nihongokawaii.com';
  const adminUsername = 'admin';

  try {
    // 1. Check if the admin user already exists in Supabase Auth
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
    if (listError) throw listError;

    if (users.some(u => u.email === adminEmail)) {
      console.log('An admin user with this email already exists in Supabase Auth.');
      return;
    }

    // 2. Generate a secure random password
    const password = randomBytes(12).toString('hex');

    // 3. Create the user in Supabase Auth
    const { data: { user }, error: createError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: password,
      email_confirm: true,
      user_metadata: { username: adminUsername, role: 'admin' }
    });

    if (createError) throw createError;

    console.log('✅ Admin user created in Supabase Auth. The trigger will handle the public.users record.');

    console.log('✅ Admin user created successfully in Supabase!');
    console.log('---');
    console.log('Please use these credentials to log in:');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${password}`);
    console.log('---');
    console.log('IMPORTANT: Please save this password in a secure location.');

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  }
}

createAdmin();
