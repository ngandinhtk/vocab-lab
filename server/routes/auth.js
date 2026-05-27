import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import supabase from '../db.js';

const saltRounds = 10;

function normalizeUser(row = {}) {
  const username = row.username || row.name || '';
  const name = row.name || row.username || '';

  return {
    id: row.id,
    email: row.email,
    username,
    name,
    subscription_tier: row.subscription_tier || 'free',
    role: row.role || 'user',
  };
}

export function registerAuthRoutes(app) {
  // User Registration
  app.post('/api/auth/register', async (req, res) => {
    try {
      const { username, name, email, password } = req.body;
      const finalName = name || username;

      if (!email || !password || !finalName) {
        return res.status(400).json({ error: 'Username, email, and password are required' });
      }

      const passwordHash = await bcrypt.hash(password, saltRounds);

      const createUser = async (payload) => supabase
        .from('users')
        .insert(payload)
        .select('*')
        .single();

      // Try the current schema first, then fall back to the legacy schema.
      const primaryInsert = await createUser({
        email,
        name: finalName,
        password_hash: passwordHash,
        role: 'user',
      });

      let { data: user, error: userError } = primaryInsert;

      if (userError?.code === '42703') {
        const legacyInsert = await createUser({
          email,
          username: finalName,
          password_hash: passwordHash,
          subscription_tier: 'free',
          role: 'user',
        });
        user = legacyInsert.data;
        userError = legacyInsert.error;
      }

      if (userError) {
        if (userError.code === '23505') { 
          return res.status(409).json({ error: 'Email or username already exists' });
        }
        throw userError;
      }

      const normalizedUser = normalizeUser(user);

      // 2. Automatically create a Profile for the new user
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({ id: normalizedUser.id });

      if (profileError) {
        console.error("Failed to create user profile:", profileError);
        // Depending on strictness, we might delete the user here if profile creation fails
      }

      // 3. Initialize default User Settings
      const { error: settingsError } = await supabase
        .from('user_settings')
        .insert({ user_id: normalizedUser.id });
        
      if (settingsError) {
        console.error("Failed to create user settings:", settingsError);
      }

      res.status(201).json(normalizedUser);
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

      const normalizedUser = normalizeUser(user);

      const token = jwt.sign(
        { 
          id: normalizedUser.id,
          username: normalizedUser.username,
          name: normalizedUser.name,
          email: normalizedUser.email,
          subscription_tier: normalizedUser.subscription_tier,
          role: normalizedUser.role
        },
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: '7d' }
      );

      res.json({ token, user: normalizedUser });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
}
