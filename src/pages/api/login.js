
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    const dbPath = path.resolve(process.cwd(), 'db.json');
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    const user = db.users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
