import supabase from "../db.js";
import { authenticateToken } from "../middleware/auth.js";

export function registerApiRoutes(app) {
  
  // ==========================================
  // VOCABULARY API
  // ==========================================
  app.get("/api/vocabulary", async (req, res) => {
    try {
      const { data, error } = await supabase.from('vocabulary').select('*').order('id');
      if (error) throw error;
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get("/api/vocabulary/:id", async (req, res) => {
    try {
      const { data, error } = await supabase.from('vocabulary').select('*').eq('id', req.params.id).single();
      if (error || !data) return res.status(404).json({ error: 'Vocabulary not found' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // ==========================================
  // KANJI API
  // ==========================================
  app.get("/api/kanji", async (req, res) => {
    try {
      const { data, error } = await supabase.from('kanji').select('*').order('id');
      if (error) throw error;
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get("/api/kanji/:id", async (req, res) => {
    try {
      const { data, error } = await supabase.from('kanji').select('*').eq('id', req.params.id).single();
      if (error || !data) return res.status(404).json({ error: 'Kanji not found' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // ==========================================
  // GRAMMAR API
  // ==========================================
  app.get('/api/grammar', async (req, res) => {
    try {
      const { data, error } = await supabase.from('grammar').select('*').order('id');
      if (error) throw error;
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/grammar/:id', async (req, res) => {
    try {
      const { data, error } = await supabase.from('grammar').select('*').eq('id', req.params.id).single();
      if (error || !data) return res.status(404).json({ error: 'Grammar point not found' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // ==========================================
  // LESSONS API
  // ==========================================
  app.get('/api/lessons', async (req, res) => {
    try {
      const { data, error } = await supabase.from('lessons').select('*').order('level');
      if (error) throw error;
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/lessons/:id', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select(`
          *,
          lesson_vocabulary ( vocabulary ( * ) ),
          lesson_kanji ( kanji ( * ) ),
          lesson_grammar ( grammar ( * ) )
        `)
        .eq('id', req.params.id)
        .single();
        
      if (error || !data) return res.status(404).json({ error: 'Lesson not found' });
      
      // Flatten the nested data structure for the frontend
      const formattedData = {
        ...data,
        vocabulary: data.lesson_vocabulary?.map(lv => lv.vocabulary) || [],
        kanji: data.lesson_kanji?.map(lk => lk.kanji) || [],
        grammar: data.lesson_grammar?.map(lg => lg.grammar) || [],
      };
      
      // Clean up the raw join table data
      delete formattedData.lesson_vocabulary;
      delete formattedData.lesson_kanji;
      delete formattedData.lesson_grammar;

      res.json(formattedData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // ==========================================
  // USER PROFILE API (Protected)
  // ==========================================
  app.get('/api/users/profile', authenticateToken, async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          users ( email, name, level, streak, exp, role )
        `)
        .eq('id', req.user.id)
        .single();
      
      if (error || !data) return res.status(404).json({ error: 'Profile not found' });
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

}
