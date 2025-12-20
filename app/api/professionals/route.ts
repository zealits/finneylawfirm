import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';
import { promises as fs } from 'fs';
import path from 'path';
import { Prisma } from '@prisma/client';

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function GET() {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const professionals = await prisma.professional.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
      orderBy: {
        lastName: 'asc',
      },
    });

    return NextResponse.json(professionals);
  } catch (error) {
    console.error('Get professionals error', error);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();

    const firstName = ((formData.get('firstName') as string | null) ?? '').trim();
    const middleName = ((formData.get('middleName') as string | null) ?? '').trim();
    const lastName = ((formData.get('lastName') as string | null) ?? '').trim();
    const title = ((formData.get('title') as string | null) ?? '').trim();
    const category =
      ((formData.get('category') as string | null) ?? 'ATTORNEYS') || 'ATTORNEYS';
    const phone = ((formData.get('phone') as string | null) ?? '').trim();
    const email = ((formData.get('email') as string | null) ?? '').trim();

    const practiceAreasSelected = formData.getAll('practiceAreas') as string[];
    const practiceAreas =
      practiceAreasSelected.length > 0 ? practiceAreasSelected.join(', ') : null;

    const biography = ((formData.get('biography') as string | null) ?? '').trim();
    const educationText = ((formData.get('education') as string | null) ?? '').trim();
    const memberships = ((formData.get('memberships') as string | null) ?? '').trim();
    const admittedToPracticeRaw =
      ((formData.get('admittedToPractice') as string | null) ?? '').trim();

    const admittedToPractice = admittedToPracticeRaw
      ? admittedToPracticeRaw
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean)
      : [];

    // Build a combined biography that also stores memberships and education text
    let combinedBiography = biography;
    if (educationText) {
      combinedBiography += `${combinedBiography ? '\n\n' : ''}Education:\n${educationText}`;
    }
    if (memberships) {
      combinedBiography += `${
        combinedBiography ? '\n\n' : ''
      }Memberships:\n${memberships}`;
    }

    // Handle image upload
    let imagePath: string | null = null;
    const image = formData.get('image');

    if (image && image instanceof File) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${image.name.replace(/\s+/g, '-')}`;
      const uploadDir = path.join(
        process.cwd(),
        'public',
        'images',
        'team-members'
      );

      await fs.mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, fileName);
      await fs.writeFile(filePath, buffer);

      imagePath = path.join('team-members', fileName).replace(/\\/g, '/');
    }

    const baseName = `${firstName} ${lastName}`.trim() || 'professional';
    let slug = slugify(baseName);
    if (!slug) {
      slug = `professional-${Date.now()}`;
    }

    const professional = await prisma.professional.create({
      data: {
        firstName,
        middleName: middleName || null,
        lastName,
        title,
        category: category as any,
        phone,
        email,
        practiceAreas,
        imagePath,
        slug,
        biography: combinedBiography || null,
        education: educationText ? { raw: educationText } : Prisma.JsonNull,
        admittedToPractice,
      },
    });

    return NextResponse.json({ professional }, { status: 201 });
  } catch (error) {
    console.error('Create professional error', error);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}



