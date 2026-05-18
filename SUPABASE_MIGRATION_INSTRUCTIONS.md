## Testing and Deployment Instructions for Supabase Migration

### Manual Testing Steps:

1.  **Start the application:**
    ```bash
    npm install # Ensure all dependencies are installed
    npm run dev
    ```
    -   Client: `http://localhost:5173`
    -   Server: `http://localhost:3001`

2.  **Verify Database Health:**
    *   Open your browser or use a tool like Postman/Insomnia to access `http://localhost:3001/db-health`. You should see a JSON response indicating `"database": "connected"`.

3.  **User Authentication:**
    *   **Register a new user:** Navigate to the registration page (e.g., `/register` or equivalent on your frontend). Use valid credentials to register.
    *   **Login with the new user:** After registration, attempt to log in with the newly created user.
    *   **Verify authenticated access:** Access any API endpoints that require authentication (e.g., `GET /api/grammar_points` with a valid JWT in the `Authorization` header). Verify that data is fetched correctly and subscription tier logic (e.g., free user limits) is applied.

4.  **Levels API:**
    *   **GET /api/levels:** Fetch all levels.
    *   **GET /api/levels/:id:** Fetch a specific level by ID.
    *   **POST /api/levels:** Create a new level (if applicable and accessible).
    *   **PUT /api/levels/:id:** Update an existing level.
    *   **DELETE /api/levels/:id:** Delete a level.

5.  **Grammar Points API:**
    *   **GET /api/grammar_points:** Fetch all grammar points (check free vs. paid limits).
    *   **GET /api/grammar_points/:id:** Fetch a specific grammar point by ID.
    *   **POST /api/grammar_points:** Create a new grammar point.
    *   **PUT /api/grammar_points/:id:** Update an existing grammar point.
    *   **DELETE /api/grammar_points/:id:** Delete a grammar point.

6.  **JLPT Questions API:**
    *   **GET /api/jlpt_questions:** Fetch all JLPT questions (check free vs. paid limits).
    *   **GET /api/jlpt_questions/:id:** Fetch a specific JLPT question by ID.
    *   **POST /api/jlpt_questions:** Create a new JLPT question.
    *   **PUT /api/jlpt_questions/:id:** Update an existing JLPT question.
    *   **DELETE /api/jlpt_questions/:id:** Delete a JLPT question.

### Deployment Instructions:

1.  **Update Environment Variables:**
    *   On your deployment platform (e.g., Vercel, Heroku, Netlify, Render), navigate to your project's environment variable settings.
    *   Add the following new environment variables:
        *   `SUPABASE_URL`: Your Supabase Project URL (e.g., `https://yourproject.supabase.co`)
        *   `SUPABASE_KEY`: Your Supabase Public API Key (anon key) (e.g., `eyJ...`)
        *   `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase Service Role Key (Keep this secret! Only for server/scripts)
    *   Remove any old PostgreSQL-related environment variables (e.g., `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`).
2.  **Redeploy your application.**
