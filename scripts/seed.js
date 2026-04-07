import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { constitutionalArticles } from '../src/app/utils/articlesData.js';
import { quizSets } from '../src/app/utils/quizData.js';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or Key missing in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedArticles() {
  console.log('Seeding articles...');
  const articlesToInsert = [];

  for (const [category, data] of Object.entries(constitutionalArticles)) {
    for (const article of data.articles) {
      articlesToInsert.push({
        category: category,
        number: article.number,
        title: article.title,
        full_text: article.fullText,
        explanation: article.explanation,
        key_points: JSON.stringify(article.keyPoints),
        important_cases: JSON.stringify(article.importantCases)
      });
    }
  }

  const { error } = await supabase.from('articles').insert(articlesToInsert);
  if (error) console.error('Error seeding articles:', error);
  else console.log(`Successfully seeded ${articlesToInsert.length} articles.`);
}

async function seedQuizzes() {
  console.log('Seeding quizzes...');
  
  for (const set of quizSets) {
    // 1. Insert Quiz
    const { data: quizData, error: quizError } = await supabase
      .from('quizzes')
      .insert({
        id: set.id,
        title: set.title,
        description: set.description
      })
      .select()
      .single();

    if (quizError) {
      console.error(`Error seeding quiz ${set.id}:`, quizError);
      continue;
    }

    // 2. Insert Questions
    const questionsToInsert = set.questions.map(q => ({
      quiz_id: quizData.id,
      question: q.question,
      options: JSON.stringify(q.options),
      correct_answer: q.correctAnswer,
      explanation: q.explanation
    }));

    const { error: questionsError } = await supabase
      .from('quiz_questions')
      .insert(questionsToInsert);

    if (questionsError) console.error(`Error seeding questions for quiz ${set.id}:`, questionsError);
    else console.log(`Successfully seeded quiz ${set.id} with ${questionsToInsert.length} questions.`);
  }
}

async function main() {
  try {
    await seedArticles();
    await seedQuizzes();
    console.log('Database seeding completed!');
  } catch (err) {
    console.error('Seed script failed:', err);
  }
}

main();
