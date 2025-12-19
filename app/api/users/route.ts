import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, passwordHash } = body;

    // Validate input
    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: 'First name and last name are required' },
        { status: 400 }
      );
    }

    if (!email || !passwordHash) {
      return NextResponse.json(
        { error: 'Email and password hash are required' },
        { status: 400 }
      );
    }

    // Combine firstName and lastName into name field
    const name = `${firstName.trim()} ${lastName.trim()}`.trim();

    // Create user in database
    const user = await prisma.user.create({
      data: {
        name,
        email: email.trim(),
        passwordHash,
      },
    });

    return NextResponse.json(
      { message: 'User created successfully', user },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}


