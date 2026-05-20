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

const JLPT_LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];
const BASE_URL = 'https://raw.githubusercontent.com/tristcoil/hanabira.org-japanese-content/master/grammar_json/';

async function importGrammar() {
  console.log('Starting Hanabira grammar import...');

  // Optional: Clear existing grammar data
  // console.log('Clearing existing grammar data...');
  // await prisma.grammar.deleteMany({});

  for (const levelStr of JLPT_LEVELS) {
    // Map N5 -> 5, N4 -> 4, ..., N1 -> 1
    const level = parseInt(levelStr.replace('N', ''));
    const url = `${BASE_URL}grammar_ja_${levelStr}_full_alphabetical_0001.json`;
    
    console.log(`\n--- Processing ${levelStr} ---`);
    console.log(`Fetching from: ${url}`);
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`Failed to fetch ${levelStr}: ${response.statusText}`);
        continue;
      }
      
      const data = await response.json();
      console.log(`Found ${data.length} grammar points. Importing...`);

      let count = 0;
      for (const item of data) {
        const explanation = `
### ${item.short_explanation || ''}

${item.long_explanation || ''}

**Formation:**
${item.formation || ''}
        `.trim();

        const examples = item.examples?.map(ex => ({
          ja: ex.jp,
          en: ex.en,
          vi: "" // Vietnamese translation not available in Hanabira dataset
        })) || [];

        try {
          await prisma.grammar.create({
            data: {
              title: item.title,
              explanation,
              examples,
              level: level
            }
          });
          count++;
          if (count % 10 === 0) process.stdout.write('.');
        } catch (dbError) {
          console.error(`\nError creating grammar point "${item.title}":`, dbError.message);
        }
      }
      console.log(`\nSuccessfully imported ${count} items for ${levelStr}`);
    } catch (error) {
      console.error(`\nError processing ${levelStr}:`, error.message);
    }
  }

  console.log('\nImport completed!');
}

importGrammar()
  .catch(e => {
    console.error('Fatal error during import:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
