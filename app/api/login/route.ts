
import { NextRequest, NextResponse } from 'next/server';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const usersCollection = collection(db, 'users');
    const q = query(usersCollection, where('username', '==', username));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json({ message: 'Invalid username or password' }, { status: 400 });
    }

    const userDoc = querySnapshot.docs[0];
    const user = userDoc.data();

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ message: 'Invalid username or password' }, { status: 400 });
    }

    // Here you would typically create a session or JWT

    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json({ message: 'Error logging in' }, { status: 500 });
  }
}
