import supabase from "./db.js";

async function getLevels() {
  try {
    const { data, error } = await supabase.from('levels').select('id, name').order('id');
    if (error) throw error;
    console.log("Available Levels:");
    data.forEach(level => console.log(`ID: ${level.id}, Name: ${level.name}`));
    process.exit(0);
  } catch (err) {
    console.error("Error fetching levels:", err.message);
    process.exit(1);
  }
}

getLevels();