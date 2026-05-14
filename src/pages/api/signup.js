
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    const dbPath = path.resolve(process.cwd(), 'db.json');
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    db.users.push({ username, password });
    fs.writeFileSync(dbPath, JSON.stringify(db));

    res.status(200).json({ message: 'Signup successful' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
