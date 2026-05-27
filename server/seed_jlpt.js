import supabase from './db.js';
import { jlptTests } from '../client/src/jlptBank.js';

async function seedJlpt() {
  console.log('Seeding JLPT tests and questions...');

  const { error: delQError } = await supabase.from('jlpt_questions').delete().neq('id', 0);
  const { error: delTError } = await supabase.from('jlpt_tests').delete().neq('id', 0);

  if (delQError || delTError) {
    console.error('Error clearing data:', delQError || delTError);
    return;
  }

  const tests = Object.values(jlptTests);

  for (const testData of tests) {
    const { questions, level, title, description, passScore } = testData;

    const { data: test, error: tError } = await supabase
      .from('jlpt_tests')
      .insert([{
        level: Number(String(level).replace('N', '')),
        title,
        description,
        pass_score: passScore
      }])
      .select()
      .single();

    if (tError) {
      console.error(`Error inserting test ${title}:`, tError);
      continue;
    }

    const questionsWithTestId = questions.map((question) => ({
      ...question,
      test_id: test.id
    }));

    const { error: qError } = await supabase
      .from('jlpt_questions')
      .insert(questionsWithTestId);

    if (qError) {
      console.error(`Error inserting questions for test ${test.id}:`, qError);
    } else {
      console.log(`Successfully seeded test: ${test.title}`);
    }
  }

  console.log('JLPT seeding completed.');
}

seedJlpt();
