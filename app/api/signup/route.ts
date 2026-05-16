
import { NextRequest, NextResponse } from 'next/server';
import { collection, addDoc, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const usersCollection = collection(db, 'users');

    // Check if username already exists
    const q = query(usersCollection, where('username', '==', username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return NextResponse.json({ message: 'Username already exists' }, { status: 400 });
    }

    // Get the last used ID
    const lastUserQuery = query(usersCollection, orderBy('id', 'desc'), limit(1));
    const lastUserSnapshot = await getDocs(lastUserQuery);
    const lastId = lastUserSnapshot.empty ? 0 : lastUserSnapshot.docs[0].data().id;
    const newId = lastId + 1;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to Firestore
    await addDoc(usersCollection, {
      id: newId,
      username,
      password: hashedPassword,
    });

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
  }
}
