import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, access } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { getCurrentAdmin } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-');
    const filename = `${timestamp}-${originalName}`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Define upload path
    const uploadDir = join(process.cwd(), 'public', 'images', 'blog');
    const filepath = join(uploadDir, filename);

    // Ensure directory exists (create if it doesn't)
    try {
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
        console.log(`Created directory: ${uploadDir}`);
      }
    } catch (dirError: any) {
      console.error('Error creating directory:', dirError);
      // In production (serverless), directory might be read-only
      // Log the error but continue - the writeFile will fail with a clearer error
    }

    // Write file
    try {
      await writeFile(filepath, buffer);
      console.log(`Successfully uploaded image: ${filename}`);
      
      // Verify file was written (important for production environments)
      try {
        await access(filepath);
        console.log(`Verified file exists: ${filename}`);
      } catch (verifyError) {
        console.error('File verification failed:', verifyError);
        return NextResponse.json(
          { 
            error: 'File was written but cannot be verified. This may indicate a read-only file system in production. Please use cloud storage (S3, Cloudinary, etc.) for production environments.' 
          },
          { status: 500 }
        );
      }
    } catch (writeError: any) {
      console.error('Error writing file:', writeError);
      // Check if it's a permission error (common in production)
      if (writeError.code === 'EACCES' || writeError.code === 'EROFS') {
        return NextResponse.json(
          { 
            error: 'File system is read-only. In production environments (like Vercel, AWS Lambda, etc.), the file system is read-only. Please configure cloud storage (AWS S3, Cloudinary, etc.) for image uploads.' 
          },
          { status: 500 }
        );
      }
      throw writeError;
    }

    // Return the public URL
    const imageUrl = `/images/blog/${filename}`;

    return NextResponse.json({ url: imageUrl }, { status: 200 });
  } catch (error: any) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload image' },
      { status: 500 }
    );
  }
}
