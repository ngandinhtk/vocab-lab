import { query } from "../db.js";

export function registerApiRoutes(app) {
  // Levels API
  app.get("/api/levels", async (req, res) => {
    try {
      const { rows } = await query('SELECT * FROM levels ORDER BY name');
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get("/api/levels/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { rows } = await query('SELECT * FROM levels WHERE id = $1', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Level not found' });
      }
      res.json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post("/api/levels", async (req, res) => {
    try {
      const { name, description } = req.body;
      const { rows } = await query('INSERT INTO levels(name, description) VALUES($1, $2) RETURNING *', [name, description]);
      res.status(201).json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.put("/api/levels/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const { rows } = await query('UPDATE levels SET name = $1, description = $2 WHERE id = $3 RETURNING *', [name, description, id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Level not found' });
      }
      res.json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.delete("/api/levels/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { rowCount } = await query('DELETE FROM levels WHERE id = $1', [id]);
      if (rowCount === 0) {
        return res.status(404).json({ error: 'Level not found' });
      }
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
}

