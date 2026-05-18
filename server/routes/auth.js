import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import supabase from '../db.js';

const saltRounds = 10;

export function registerAuthRoutes(app) {
  // User Registration
  app.post('/api/auth/register', async (req, res) => {
    try {
      // The frontend might send 'username', so we map it to 'name' in our new schema
      const { username, name, email, password } = req.body;
      const finalName = name || username;

      if (!email || !password || !finalName) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
      }

      const passwordHash = await bcrypt.hash(password, saltRounds);
      
      // 1. Insert into Users table
      const { data: user, error: userError } = await supabase
        .from('users')
        .insert({ 
          email, 
          name: finalName, 
          password_hash: passwordHash,
          role: 'user'
        })
        .select('id, email, name, role')
        .single();

      if (userError) {
        if (userError.code === '23505') { 
          return res.status(409).json({ error: 'Email already exists' });
        }
        throw userError;
      }

      // 2. Automatically create a Profile for the new user
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({ id: user.id });

      if (profileError) {
        console.error("Failed to create user profile:", profileError);
        // Depending on strictness, we might delete the user here if profile creation fails
      }

      // 3. Initialize default User Settings
      const { error: settingsError } = await supabase
        .from('user_settings')
        .insert({ user_id: user.id });
        
      if (settingsError) {
        console.error("Failed to create user settings:", settingsError);
      }

      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // User Login
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { 
          id: user.id, 
          name: user.name, 
          email: user.email,
          role: user.role
        },
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: '7d' }
      );

      res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
}
