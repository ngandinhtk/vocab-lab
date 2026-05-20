import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import dotenv from 'dotenv';
import { resolve } from 'path';

// Fix path to point to root .env from server/
dotenv.config({ path: resolve(process.cwd(), '.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const JLPT_LEVELS = [5, 4, 3, 2, 1];
const BASE_URL = 'https://raw.githubusercontent.com/wkei/jlpt-vocab-api/main/data-source/db/n';

async function importVocabulary() {
  console.log('Starting Vocabulary import from wkei/jlpt-vocab-api...');

  // Clear existing vocabulary to prevent duplicates
  console.log('Clearing existing vocabulary data...');
  await prisma.vocabulary.deleteMany({});
  console.log('Cleared.');

  let totalCount = 0;

  for (const level of JLPT_LEVELS) {
    const url = `${BASE_URL}${level}.json`;
    console.log(`\n--- Processing JLPT N${level} ---`);
    console.log(`Fetching from: ${url}`);
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`Failed to fetch N${level} data: ${response.statusText}`);
        continue;
      }
      
      const data = await response.json();
      console.log(`Found ${data.length} vocabulary words for N${level}. Importing...`);

      // We use createMany for bulk insert performance
      const vocabData = data.map(item => ({
        word: item.word,
        reading: item.furigana || item.word, // fallback to word if no furigana (e.g., Kana-only words)
        meaning: item.meaning,
        level: item.level, // Which is already 5, 4, 3, 2, or 1
      }));

      // Prisma's createMany lets us insert an array of objects
      const result = await prisma.vocabulary.createMany({
        data: vocabData,
        skipDuplicates: false, // word is not unique, so skipDuplicates won't work based on word, but that's ok since we cleared table
      });

      console.log(`\nSuccessfully imported ${result.count} items for N${level}`);
      totalCount += result.count;
    } catch (error) {
      console.error(`\nError processing N${level}:`, error.message);
    }
  }

  console.log('\n==================================');
  console.log(`Import completed! Total vocabulary imported: ${totalCount}`);
  console.log('==================================\n');
}

importVocabulary()
  .catch(e => {
    console.error('Fatal error during import:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
