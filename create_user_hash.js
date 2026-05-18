import bcrypt from 'bcrypt';

const saltRounds = 10;

// Change this to your desired password
const password = 'mypassword123';

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    console.log(`Password hash for "${password}":`, hash);
    console.log('\nUse this SQL to insert/update the user:');
    console.log(`INSERT INTO users (username, email, password_hash, subscription_tier, role) VALUES ('username', 'user@example.com', '${hash}', 'free', 'user');`);
    console.log('\nOr to update existing user:');
    console.log(`UPDATE users SET password_hash = '${hash}' WHERE email = 'user@example.com';`);
  }
});