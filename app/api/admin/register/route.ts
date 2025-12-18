import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createAuthToken, hashPassword, setAuthCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body as {
      email?: string;
      password?: string;
      name?: string;
    };

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: 'User with this email already exists.' },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name: name || null,
        role: 'ADMIN',
      },
    });

    const token = createAuthToken({ userId: user.id, role: 'ADMIN' });
    await setAuthCookie(token);

    return NextResponse.json(
      { message: 'Admin registered successfully.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Admin register error', error);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}

