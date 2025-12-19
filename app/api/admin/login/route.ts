import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createAuthToken, setAuthCookie, verifyPassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Invalid credentials.' },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials.' },
        { status: 401 }
      );
    }

    const token = createAuthToken({ userId: user.id, role: 'ADMIN' });
    await setAuthCookie(token);

    return NextResponse.json({ message: 'Logged in successfully.' });
  } catch (error) {
    console.error('Admin login error', error);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}



