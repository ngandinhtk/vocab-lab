# Prisma Import - Hanabira Grammar

I have set up Prisma and created an import script to bring Japanese grammar data (N1-N5) from Hanabira.org into your database.

## Prerequisites

1.  **DATABASE_URL**: You need to provide your PostgreSQL connection string (Supabase) in the `.env` file.
    Example:
    ```env
    DATABASE_URL="postgresql://postgres:your-password@db.your-project.supabase.co:5432/postgres"
    ```

## How to Import

Run the following command in your terminal:

```bash
node server/import_hanabira.js
```

## What this does:

1.  Connects to your database using Prisma.
2.  Fetches grammar JSON files for levels N1 through N5 from the Hanabira.org GitHub repository.
3.  Maps the Hanabira schema to your `grammar` table:
    *   `title` -> `title`
    *   `short_explanation` + `long_explanation` + `formation` -> `explanation`
    *   `examples` -> `examples` (mapped to `{ ja, en, vi }` format)
    *   Level mapping: N5=5, N4=4, N3=3, N2=2, N1=1.

## Note on Prisma 7
This project uses **Prisma 7.8.0**. The database URL is configured in `prisma.config.ts` instead of `schema.prisma`.
