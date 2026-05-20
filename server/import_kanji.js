import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import dotenv from 'dotenv';
import { resolve } from 'path';

// Fix path to point to root .env from server/
dotenv.config({ path: resolve(process.cwd(), '.env') });

// Since Prisma 7 doesn't support 'url' in schema, we pass the URL using an adapter
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

const DATA_URL = 'https://raw.githubusercontent.com/davidluzgouveia/kanji-data/master/kanji.json';

async function importKanji() {
  console.log('Starting Kanji import from davidluzgouveia/kanji-data...');

  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    
    const data = await response.json();
    const characters = Object.keys(data);
    console.log(`Found ${characters.length} kanji in dataset. Filtering for JLPT N1-N5...`);

    let count = 0;
    let skipped = 0;

    for (const char of characters) {
      const item = data[char];
      
      // We only want JLPT N1-N5
      if (!item.jlpt_new || item.jlpt_new < 1 || item.jlpt_new > 5) {
        skipped++;
        continue;
      }

      try {
        await prisma.kanji.upsert({
          where: { character: char },
          update: {
            strokes: item.strokes,
            meaning: item.meanings ? item.meanings.join(', ') : null,
            onyomi: item.readings_on ? item.readings_on.join(', ') : null,
            kunyomi: item.readings_kun ? item.readings_kun.join(', ') : null,
            level: item.jlpt_new,
          },
          create: {
            character: char,
            strokes: item.strokes,
            meaning: item.meanings ? item.meanings.join(', ') : null,
            onyomi: item.readings_on ? item.readings_on.join(', ') : null,
            kunyomi: item.readings_kun ? item.readings_kun.join(', ') : null,
            level: item.jlpt_new,
          }
        });
        count++;
        if (count % 50 === 0) process.stdout.write('.');
      } catch (dbError) {
        console.error(`\nError importing kanji "${char}":`, dbError.message);
      }
    }
    
    console.log(`\n\nImport completed!`);
    console.log(`Successfully imported/updated: ${count}`);
    console.log(`Skipped (no JLPT level): ${skipped}`);

  } catch (error) {
    console.error('\nError during import:', error.message);
  }
}

importKanji()
  .catch(e => {
    console.error('Fatal error during import:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
