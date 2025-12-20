import { NextRequest, NextResponse } from 'next/server';
import { getAllTags, getOrCreateTag } from '@/lib/blog';

// GET /api/blog/tags - Get all tags (public)
export async function GET() {
  try {
    const tags = await getAllTags();
    return NextResponse.json(tags);
  } catch (error: any) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch tags' },
      { status: 500 }
    );
  }
}

// POST /api/blog/tags - Create new tag
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Tag name is required' },
        { status: 400 }
      );
    }

    const tag = await getOrCreateTag(name.trim());
    return NextResponse.json(tag, { status: 201 });
  } catch (error: any) {
    console.error('Error creating tag:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create tag' },
      { status: 500 }
    );
  }
}
