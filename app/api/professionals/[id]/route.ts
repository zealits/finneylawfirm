import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const professional = await prisma.professional.findUnique({
      where: { id },
    });

    if (!professional) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ professional });
  } catch (error) {
    console.error('Get professional error', error);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      firstName,
      middleName,
      lastName,
      title,
      category,
      phone,
      email,
      practiceAreas,
      biography,
      education,
      memberships,
      admittedToPractice,
    } = body as {
      firstName?: string;
      middleName?: string;
      lastName?: string;
      title?: string;
      category?: string;
      phone?: string;
      email?: string;
      practiceAreas?: string[] | string;
      biography?: string;
      education?: string;
      memberships?: string;
      admittedToPractice?: string;
    };

    const practiceAreasStr = Array.isArray(practiceAreas)
      ? practiceAreas.join(', ')
      : practiceAreas || null;

    const admittedArray = admittedToPractice
      ? admittedToPractice
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean)
      : [];

    let combinedBiography = biography || '';
    if (education) {
      combinedBiography += `${combinedBiography ? '\n\n' : ''}Education:\n${education}`;
    }
    if (memberships) {
      combinedBiography += `${
        combinedBiography ? '\n\n' : ''
      }Memberships:\n${memberships}`;
    }

    const updated = await prisma.professional.update({
      where: { id },
      data: {
        firstName,
        middleName,
        lastName,
        title,
        category: (category as any) || undefined,
        phone,
        email,
        practiceAreas: practiceAreasStr,
        biography: combinedBiography || null,
        education: education ? { raw: education } : null,
        admittedToPractice: admittedArray,
      },
    });

    return NextResponse.json({ professional: updated });
  } catch (error) {
    console.error('Update professional error', error);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}

